import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Job {
    _id: string;
    title: string;
    description: string;
    status: 'open' | 'closed';
    createdAt: string;
}

interface JobsState {
    items: Job[];
    loading: boolean;
    error: string | null;
}

const initialState: JobsState = {
    items: [],
    loading: false,
    error: null,
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state, action: PayloadAction<Job[]>) => {
            state.items = action.payload;
        },
        addJob: (state, action: PayloadAction<Job>) => {
            state.items.unshift(action.payload);
        },
    },
});

export const { setJobs, addJob } = jobsSlice.actions;
export default jobsSlice.reducer;
