#########################################
#           Import Statements           #
#########################################

from flask import Flask, render_template, redirect, request, url_for, flash, session, send_file
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId
import os


#########################################
#           Flask App Setup            #
#########################################

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Replace with environment-safe key

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


#########################################
#           MongoDB Setup              #
#########################################

client = MongoClient("mongodb://localhost:27017/")
db = client["university_roles"]
users_col = db["users"]


#########################################
#           Login Management           #
#########################################

class User(UserMixin):
    def __init__(self, user_doc):
        self.id = str(user_doc["_id"])
        self.email = user_doc["email"]
        self.name = user_doc["name"]
        self.role = user_doc["role"]

@login_manager.user_loader
def load_user(user_id):
    user_doc = users_col.find_one({"_id": ObjectId(user_id)})
    return User(user_doc) if user_doc else None


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#########################################
#           Matching Logic             #
#########################################

def compute_matches():
    students = list(users_col.find({
        "role": "student",
        "resume_uploaded": True,
        "major": {"$exists": True, "$ne": ""},
        "education_level": {"$exists": True, "$ne": ""},
        "desired_role": {"$exists": True, "$ne": ""},
        "research_interests": {"$exists": True, "$ne": ""},
        "skills": {"$exists": True, "$not": {"$size": 0}}
    }))

    professors = list(db.professors.find())
    matches = []

    def compute_score(student, professor):
        score = 0
        reasons = []

        if student["research_interests"] in professor["research_interests"]:
            score += 40
            reasons.append(f"shared interest in {student['research_interests']}")

        skill_overlap = set(student["skills"]).intersection(set(professor.get("research_interests", [])))
        if skill_overlap:
            score += min(len(skill_overlap) * 5, 30)
            reasons.append(f"skill overlap: {', '.join(skill_overlap)}")

        if student["desired_role"] in professor["positions_available"]:
            score += 30
            reasons.append(f"matched desired role: {student['desired_role']}")

        return score, "; ".join(reasons)

    for student in students:
        for professor in professors:
            score, reasons = compute_score(student, professor)
            if score > 0:
                matches.append({
                    "student": student["name"],
                    "professor": professor["name"],
                    "score": score,
                    "reasons": reasons,
                    "role": student["desired_role"],
                    "interest": student["research_interests"]
                })

    return sorted(matches, key=lambda x: x["score"], reverse=True)


#########################################
#               Routes                 #
#########################################

# Authentication Routes
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        password = request.form["password"]
        role = request.form["role"]

        if users_col.find_one({"email": email}):
            flash("Email already registered.")
            return redirect(url_for("register"))

        hashed_pw = generate_password_hash(password)
        user = {"name": name, "email": email, "password_hash": hashed_pw, "role": role}
        users_col.insert_one(user)
        flash("Registration successful! Please log in.")
        return redirect(url_for("login"))

    return render_template("auth/register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user_doc = users_col.find_one({"email": email})
        if not user_doc or not check_password_hash(user_doc["password_hash"], password):
            flash("Invalid credentials.")
            return redirect(url_for("login"))

        login_user(User(user_doc))
        flash("Welcome, " + user_doc["name"])
        return redirect(url_for("dashboard"))

    return render_template("auth/login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash("Logged out.")
    return redirect(url_for("login"))

@app.route("/dashboard")
@login_required
def dashboard():
    if current_user.role == "student":
        return redirect(url_for("student_portal"))
    elif current_user.role == "professor":
        return redirect(url_for("professor_portal"))
    else:
        return "Unknown role"

# Home
@app.route("/")
def home():
    role_filter = request.args.get("role", "")
    interest_filter = request.args.get("interest", "")
    matches = compute_matches()
    if role_filter:
        matches = [m for m in matches if m["role"].lower() == role_filter.lower()]
    if interest_filter:
        matches = [m for m in matches if interest_filter.lower() in m["interest"].lower()]
    return render_template("matches.html", matches=matches)


# Student Portal
@app.route("/student-portal")
@login_required
def student_portal():
    professors = list(db.professors.find())
    role_filter = request.args.get("role", "")
    interest_filter = request.args.get("interest", "")
    if role_filter:
        professors = [p for p in professors if role_filter in p.get("positions_available", [])]
    if interest_filter:
        professors = [p for p in professors if interest_filter.lower() in " ".join(p.get("research_interests", [])).lower()]
    return render_template("student_portal.html", professors=professors)


# Professor Portal
@app.route("/professor-portal")
@login_required
def professor_portal():
    students = list(db.students.find({}, {
        "_id": 1,
        "name": 1,
        "major": 1,
        "education_level": 1,
        "desired_role": 1,
        "research_interests": 1,
        "skills": 1,
        "resume_uploaded": 1
    }))
    role_filter = request.args.get("role", "")
    interest_filter = request.args.get("interest", "")
    if role_filter:
        students = [s for s in students if role_filter.lower() in s.get("desired_role", "").lower()]
    if interest_filter:
        students = [s for s in students if interest_filter.lower() in s.get("research_interests", "").lower()]
    return render_template("professor_portal.html", students=students)



#########################################
#         Student Profile Routes        #
#########################################

@app.route("/edit-student-profile", methods=["GET", "POST"])
@login_required
def edit_student_profile():
    if current_user.role != "student":
        flash("Only students can edit their profile.")
        return redirect(url_for("dashboard"))

    user_doc = users_col.find_one({"_id": ObjectId(current_user.id)})

    if request.method == "POST":
        major = request.form.get("major")
        education_level = request.form.get("education_level")
        desired_role = request.form.get("desired_role")
        research_interests = request.form.get("research_interests")
        skills = request.form.get("skills")

        users_col.update_one({"_id": ObjectId(current_user.id)}, {
            "$set": {
                "major": major,
                "education_level": education_level,
                "desired_role": desired_role,
                "research_interests": research_interests,
                "skills": [skill.strip() for skill in skills.split(",") if skill.strip()]
            }
        })

        flash("Profile updated successfully.")
        return redirect(url_for("student_portal"))

    return render_template("auth/edit_student_profile.html", user=user_doc)


#########################################
#         Resume Upload/Download        #
#########################################

@app.route("/upload-resume", methods=["GET", "POST"])
@login_required
def upload_resume():
    if current_user.role != "student":
        flash("Only students can upload resumes.")
        return redirect(url_for("dashboard"))

    filename = secure_filename(current_user.id + ".pdf")
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if request.method == "POST":
        if 'delete' in request.form:
            if os.path.exists(filepath):
                os.remove(filepath)
                users_col.update_one({"_id": ObjectId(current_user.id)}, {"$set": {"resume_uploaded": False}})
                flash("Resume deleted.")
            else:
                flash("No resume to delete.")
            return redirect(url_for("upload_resume"))

        file = request.files.get("resume")
        if file and allowed_file(file.filename):
            file.save(filepath)
            users_col.update_one({"_id": ObjectId(current_user.id)}, {"$set": {"resume_uploaded": True}})
            flash("Resume uploaded successfully.")
        else:
            flash("Invalid file type. Only PDF allowed.")
        return redirect(url_for("upload_resume"))

    resume_uploaded = os.path.exists(filepath)
    return render_template("auth/upload_resume.html", resume_uploaded=resume_uploaded)


@app.route("/download-resume/<student_id>")
@login_required
def download_resume(student_id):
    if current_user.role != "professor":
        flash("Access denied.")
        return redirect(url_for("dashboard"))

    filename = secure_filename(student_id + ".pdf")
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(path):
        flash("Resume not uploaded.")
        return redirect(url_for("professor_portal"))

    return send_file(path, as_attachment=True)


#########################################
#          Match Views (Student)        #
#########################################

@app.route("/my-matches")
@login_required
def my_matches():
    if current_user.role != "student":
        flash("Access denied.")
        return redirect(url_for("dashboard"))

    student = users_col.find_one({"_id": ObjectId(current_user.id)})
    professors = list(db.professors.find())
    matches = []

    def compute_score(student, professor):
        score = 0
        reasons = []

        if student["research_interests"] in professor.get("research_interests", []):
            score += 40
            reasons.append(f"shared interest in {student['research_interests']}")

        skill_overlap = set(student.get("skills", [])).intersection(set(professor.get("research_interests", [])))
        if skill_overlap:
            score += min(len(skill_overlap) * 5, 30)
            reasons.append(f"skill overlap: {', '.join(skill_overlap)}")

        if student.get("desired_role") in professor.get("positions_available", []):
            score += 30
            reasons.append(f"matched desired role: {student['desired_role']}")

        return score, "; ".join(reasons)

    for prof in professors:
        score, reasons = compute_score(student, prof)
        if score > 0:
            matches.append({
                "professor": prof["name"],
                "department": prof["department"],
                "interests": prof["research_interests"],
                "positions": prof["positions_available"],
                "score": score,
                "reasons": reasons
            })

    matches = sorted(matches, key=lambda x: x["score"], reverse=True)
    return render_template("student_my_matches.html", matches=matches)


#########################################
#         Professor Profile Edit        #
#########################################

@app.route("/edit-professor-profile", methods=["GET", "POST"])
@login_required
def edit_professor_profile():
    if current_user.role != "professor":
        flash("Only professors can edit this profile.")
        return redirect(url_for("professor_portal")) if current_user.role == "professor" else redirect(url_for("dashboard"))

    user_doc = users_col.find_one({"_id": ObjectId(current_user.id)})

    if request.method == "POST":
        interests = request.form.get("research_interests")
        positions = request.form.get("positions")

        users_col.update_one({"_id": ObjectId(current_user.id)}, {
            "$set": {
                "research_interests": [i.strip() for i in interests.split(",") if i.strip()],
                "positions_available": [p.strip() for p in positions.split(",") if p.strip()]
            }
        })
        flash("Professor profile updated successfully.")
        return redirect(url_for("professor_portal"))

    return render_template("auth/edit_professor_profile.html", user=user_doc)


#########################################
#          Match Views (Professor)      #
#########################################

@app.route("/professor-matches")
@login_required
def professor_matches():
    if current_user.role != "professor":
        flash("Access denied.")
        return redirect(url_for("professor_portal")) if current_user.role == "professor" else redirect(url_for("dashboard"))

    professor = users_col.find_one({"_id": ObjectId(current_user.id)})
    students = list(users_col.find({
        "role": "student",
        "resume_uploaded": True,
        "major": {"$exists": True, "$ne": ""},
        "education_level": {"$exists": True, "$ne": ""},
        "desired_role": {"$exists": True, "$ne": ""},
        "research_interests": {"$exists": True, "$ne": ""},
        "skills": {"$exists": True, "$not": {"$size": 0}}
    }))

    matches = []

    def compute_score(student, professor):
        score = 0
        reasons = []

        if student.get("research_interests") in professor.get("research_interests", []):
            score += 40
            reasons.append(f"shared interest in {student['research_interests']}")

        skill_overlap = set(student.get("skills", [])).intersection(set(professor.get("research_interests", [])))
        if skill_overlap:
            score += min(len(skill_overlap) * 5, 30)
            reasons.append(f"skill overlap: {', '.join(skill_overlap)}")

        if student.get("desired_role") in professor.get("positions_available", []):
            score += 30
            reasons.append(f"matched desired role: {student['desired_role']}")

        return score, "; ".join(reasons)

    for student in students:
        score, reasons = compute_score(student, professor)
        if score > 0:
            matches.append({
                "name": student["name"],
                "major": student["major"],
                "education_level": student["education_level"],
                "desired_role": student["desired_role"],
                "research_interest": student["research_interests"],
                "skills": student["skills"],
                "score": score,
                "reasons": reasons
            })

    matches = sorted(matches, key=lambda x: x["score"], reverse=True)
    return render_template("professor_my_matches.html", matches=matches)


#########################################
#          Run the Application          #
#########################################

if __name__ == "__main__":
    app.run(debug=True)
