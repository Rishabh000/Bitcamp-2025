# Bitcamp-2025

# 🧠 TerpMatch: LLM-Powered Research Connector

An AI-driven platform that intelligently matches University of Maryland students with professors based on research interests, resumes, skills, and desired roles — powered by Google's Gemini LLM.

---

## 🚀 Live Demo

🔗 [Hosted on youtube: https://youtu.be/HsGi8SH34CM]  
📄 [Devpost Submission](https://devpost.com/software/intelligent-assistantship-matching-portal?ref_content=user-portfolio&ref_feature=in_progress)

---

## 📌 Problem

Finding TA, RA, or research opportunities at universities like UMD is often informal, inefficient, and disconnected. Students rely on scattered lists or personal networks, while professors receive large volumes of unfiltered applications.

---

## 💡 Solution

**TerpMatch** creates a smart two-sided portal:
- Students input their academic background, resume, desired role, and research interests.
- Professors specify their research areas and open positions.
- Our Gemini-powered system calculates a **compatibility score** to recommend ideal matches on both sides.

---

## 🧠 How It Works

🔹 Compatibility Score =  
> `0.2 × Role Match + 0.4 × Research Match + 0.4 × Skill Match`

- **Role Match:** Does the student want a position the professor has open?  
- **Research Match:** Uses Jaccard similarity to compare overlapping interests  
- **Skill Match:**  
  - Gemini LLM infers skills needed from professor's research  
  - Compared against student’s resume skills  

---

## 📊 Tech Stack

- **Frontend:** React.js  
- **Backend:** Flask (Python)  
- **Database:** MongoDB (via PyMongo)  
- **AI Integration:** Google Gemini API  
- **Resume Handling:** ReportLab + File Upload Support  
- **Others:** Flask-CORS, TQDM, Streamlit (for debugging)

---

## 📂 Features

- 🔍 Smart student-professor matchmaking  
- 🧠 Gemini-powered skill inference  
- 📁 Resume upload (PDF & TXT) with auto-formatting  
- 🧑‍🏫 Professor dashboard to view matched students  
- 📊 Compatibility scores for role + interest + skills

---


## 🛠️ Installation & Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/rishikathakre/Bitcamp-2025
cd terpmatch
```
### 2. Backend Setup (Flask + MongoDB)

```bash
cd backend
pip install -r requirements.txt
python app.py
```
### 3. Frontend Setup (React)
```bash
cd ../frontend
npm install
npm start
```

