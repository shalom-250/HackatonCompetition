# Neural Matching Matrix: Proprietary Ranking Algorithm 🧠

## 1. Algorithmic Overview
The Umurava AI platform uses a **100-point predictive relevance score** to rank candidates against mission requirements.

## 2. Scoring Dimensions

### A. Linguistic Correlation (20 Points)
- **Logic**: Intersection of seeker languages and job requirements.
- **Formula**: `(Matches / ReqCount) * 20`.

### B. Educational Trajectory (40 Points)
- **Base Presence (20 pts)**: Awarded for consistent education history.
- **Field Specialization (20 pts)**: Awarded if the seeker's degree field correlates with the mission's technical domain (e.g. Accounting for SPIU Accountant).

### C. Experience Depth (40 Points)
- **Full Alignment (40 pts)**: Awarded if total verified years of experience >= mission requirement.
- **Partial Alignment**: Proportional points if experience is present but below the target threshold.

## 3. Real-time Calculation
Scores are calculated server-side during the **Application Injection** phase and are instantly visible to recruiters in the Intelligence Matrix.
