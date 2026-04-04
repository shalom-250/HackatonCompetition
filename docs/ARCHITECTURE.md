# Umurava AI: System Architecture 🛡️

## 1. Technical Stack Node
The platform is built on a high-fidelity **Next.js 16 (App Router)** infrastructure, optimized for real-time talent intelligence.

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion (Animations).
- **Backend**: Next.js Server Components, API Routes.
- **Persistence**: MongoDB Atlas (Primary Data Hub).
- **Security**: NextAuth (Session Persistence) + Custom RBAC Proxy.

## 2. Neural Proxy Security (`src/proxy.ts`)
We use a centralized proxy layer to enforce Role-Based Access Control (RBAC):
- **Recruiter Nodes**: Protected routes for mission deployment and candidate ranking.
- **Seeker Nodes**: Protected routes for identity injection and application history.

## 3. Data Flow Matrix
1. **Recruiter** deploys a Mission Node (Job).
2. **Job Seeker** injects an Identity Node (Application).
3. **Neural Engine** calculates a Match Score (0-100%).
4. **Recruiter** evaluates AI-ranked candidates in the Intelligence Matrix.
