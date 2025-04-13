import json
from pymongo import MongoClient
import matplotlib.pyplot as plt
import csv

def load_data():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["university_roles"]
    students_collection = db["students"]
    professors_collection = db["professors"]

    # Clear previous data to avoid duplicates
    students_collection.delete_many({})
    professors_collection.delete_many({})

    with open("student_dataset.json", "r") as f:
        student_data = json.load(f)
        students_collection.insert_many(student_data)

    with open("professor_dataset.json", "r") as f:
        professor_data = json.load(f)
        professors_collection.insert_many(professor_data)

    print("✅ Data inserted into MongoDB.")
    return db

def match_and_visualize(db):
    students = list(db.students.find())  # ALL students
    professors = list(db.professors.find())  # ALL professors
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

        return score, reasons

    for student in students:
        for prof in professors:
            score, reasons = compute_score(student, prof)
            if score > 0:
                matches.append({
                    "student": student["name"],
                    "professor": prof["name"],
                    "score": score,
                    "reasons": "; ".join(reasons)
                })

    # 🔝 Top 10 matches
    top_matches = sorted(matches, key=lambda x: x["score"], reverse=True)[:10]

    # 📊 Plot 1: Top 10 matches
    plt.figure(figsize=(12, 6))
    labels_top = [m['student'] + "\n↔\n" + m['professor'] for m in top_matches]
    scores_top = [m['score'] for m in top_matches]
    plt.barh(labels_top, scores_top)
    plt.xlabel("Compatibility Score")
    plt.title("Top 10 Student-Professor Matches")
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig("top_matches.png")
    plt.close()

    # 📊 Plot 2: All matches
    plt.figure(figsize=(14, 12))
    labels_all = [m['student'] + "\n↔\n" + m['professor'] for m in matches]
    scores_all = [m['score'] for m in matches]
    plt.barh(labels_all, scores_all)
    plt.xlabel("Compatibility Score")
    plt.title("All Student-Professor Matches")
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig("all_matches.png")
    plt.close()

    print("✅ Plots saved as 'top_matches.png' and 'all_matches.png'")

    # 📄 Export to CSV
    with open("matched_pairs.csv", "w", newline='') as csvfile:
        fieldnames = ["student", "professor", "score", "reasons"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for match in matches:
            writer.writerow(match)

    print("📄 Matches exported to 'matched_pairs.csv'")

if __name__ == "__main__":
    db = load_data()
    match_and_visualize(db)
