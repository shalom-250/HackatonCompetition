import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Candidate {
    _id: string;
    name: string;
    email: string;
    screeningResults?: {
        score: number;
        rank: number;
        strengths: string[];
        gaps: string[];
        recommendation: string;
        interviewQuestions: string[];
        biasNote: string;
    };
}

interface CandidatesState {
    items: Candidate[];
    loading: boolean;
    error: string | null;
}

const initialState: CandidatesState = {
    items: [],
    loading: false,
    error: null,
};

const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        setCandidates: (state, action: PayloadAction<Candidate[]>) => {
            state.items = action.payload;
        },
        updateCandidateResult: (state, action: PayloadAction<{ id: string; results: any }>) => {
            const candidate = state.items.find(c => c._id === action.payload.id);
            if (candidate) {
                candidate.screeningResults = action.payload.results;
            }
        },
    },
});

export const { setCandidates, updateCandidateResult } = candidatesSlice.actions;
export default candidatesSlice.reducer;
