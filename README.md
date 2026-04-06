# Umurava AI - Talent Screening Co-Pilot 🚀

An innovation challenge project for the Umurava AI Hackathon 2026. This tool is a production-ready AI talent screening assistant that helps recruiters shortlist candidates with 100% transparency and explainability.

## 🌟 Key Features

- **AI-Powered Ranking:** Leverages Google Gemini 1.5 Flash to accurately score and rank candidates against job requirements.
- **Explainable AI:** Provides clear reasoning for every candidate, highlighting strengths, gaps, and final recommendations.
- **Bias Detection:** Built-in AI fairness check to ensure objective evaluation and flag potential biases.
- **Smart Interviewer:** Automatically generates tailored technical and behavioral questions for each candidate.
- **Premium Dashboard:** A modern, responsive interface for managing jobs and visualizing talent pools.
- **Flexible Ingestion:** Supports both structured platform profiles and external resume uploads (CSV/PDF).

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion
- **State Management:** Redux Toolkit
- **Backend:** Node.js (Next.js API Routes), TypeScript
- **Database:** MongoDB (Mongoose)
- **AI Engine:** Google Gemini API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (Local or Atlas)
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd HackatonCompetition
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🗄️ Database Management

To ensure your collaborators have the same data as you, use the following scripts to export and import the database.

### 📤 Exporting the Database
This script saves all documents from the `users`, `jobs`, `candidates`, and `applications` collections into JSON files in the `data/seed/` directory.

```bash
npx tsx src/scripts/export-db.ts
```

### 📥 Importing the Database
This script reads the JSON files from `data/seed/` and imports them into your local MongoDB.

**Prerequisites:**
- Ensure MongoDB is installed and running on your local machine.
- Your `.env.local` must have the correct `MONGODB_URI` (default: `mongodb://localhost:27017/hackaton_db`).

**Command:**
```bash
npx tsx src/scripts/import-db.ts
```
> [!WARNING]
> This will clear existing data in the `users`, `jobs`, `candidates`, and `applications` collections before importing to ensure a clean state.

## 🔐 Access Credentials

After importing the database, you can use the following accounts to test the system:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Elite Recruiter** | `recruiter@umurava.ai` | `password123` |
| **Ambitious Seeker** | `seeker@umurava.ai` | `password123` |

## 🧠 AI Decision Flow

1. **Extraction:** AI extracts key skills and requirements from the job description.
2. **Analysis:** AI parses candidate data (resumes/profiles) and maps them to extracted requirements.
3. **Scoring:** Candidates are scored across four dimensions: Skills (40%), Experience (30%), Relevance (20%), and Education (10%).
4. **Fairness Check:** A separate internal prompt layer checks for common hiring biases.
5. **Shortlisting:** AI generates the Top 10/20 shortlist with detailed qualitative reasoning.

## 📄 Assumptions & Limitations

- **Data Privacy:** Currently assumes all uploaded data is consented for AI processing.
- **Parsing Accuracy:** Resume parsing accuracy depends on the quality of the source file formatting.
- **Human in the Loop:** The tool is designed to *augment* recruiters, not replace them. Final decisions should always be reviewed by a human.

## 🏆 Hackathon Submission Details

- **Submission ID:** Team UMURAVA_AI_01
- **Live URL:** [TBD]
- **Presentation:** [Link to Google Slides]
