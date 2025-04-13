import json
import os

# Load the student dataset
with open("./data/student_dataset_old.json", "r") as f:
    data = json.load(f)

# Map names to resume filenames (from your uploads/resumes_pdf folder)
pdf_resume_folder = "uploads/resumes_pdf"
pdf_files = os.listdir(pdf_resume_folder)

# Create a mapping from name to resume filename
resume_map = {}
for file in pdf_files:
    if file.endswith(".pdf") and file.startswith("resume_"):
        # Extract name part from filename
        name = file.replace("resume_", "").replace(".pdf", "").strip()
        resume_map[name.lower()] = os.path.join(pdf_resume_folder, file)

# Update resume paths in the dataset
for student in data:
    name_key = student['name'].strip().lower()
    if name_key in resume_map:
        student['resume_path'] = resume_map[name_key]
    else:
        print(f"Resume not found for: {student['name']}")

# Save the updated JSON
with open("student_dataset.json", "w") as f:
    json.dump(data, f, indent=2)

print("Updated JSON saved as student_dataset_updated.json")
