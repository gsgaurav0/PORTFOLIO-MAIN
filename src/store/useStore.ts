import { create } from 'zustand';
import {
    projectsApi,
    skillsApi,
    experiencesApi,
    socialsApi,
    profileApi,
    type Project,
    type Skill,
    type Experience,
    type SocialLink,
    type Profile
} from '../services/api';

// --- Types ---
interface PortfolioState {
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
    socials: SocialLink[];
    profile: Profile;
    isLoading: boolean;
    error: string | null;
    hasFetched: boolean;

    // Actions
    fetchAllData: () => Promise<void>;
    refreshData: () => void;
}

// Default initial state
const defaultProfile: Profile = {
    id: "",
    name: "",
    role: "",
    bio: "",
    years: "0",
    projects_count: "0",
    awesomeness: "0",
    expertise: []
};

// Helper: Fetch with retry
const fetchWithRetry = async <T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
): Promise<T> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            console.warn(`Fetch failed, retrying in ${delay}ms... (${i + 1}/${retries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error('Fetch failed after retries');
};

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
    projects: [],
    skills: [],
    experiences: [],
    socials: [],
    profile: defaultProfile,
    isLoading: false,
    error: null,
    hasFetched: false,

    fetchAllData: async () => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null });
        try {
            const [
                projectsRes,
                skillsRes,
                expRes,
                socialsRes,
                profileRes
            ] = await Promise.all([
                fetchWithRetry(() => projectsApi.getAll()),
                fetchWithRetry(() => skillsApi.getAll()),
                fetchWithRetry(() => experiencesApi.getAll()),
                fetchWithRetry(() => socialsApi.getAll()),
                fetchWithRetry(() => profileApi.get())
            ]);

            set({
                projects: projectsRes.data || [],
                skills: skillsRes.data || [],
                experiences: expRes.data || [],
                socials: socialsRes.data || [],
                profile: profileRes.data || defaultProfile,
                isLoading: false,
                hasFetched: true
            });
        } catch (error) {
            console.error('Failed to fetch portfolio data after retries:', error);
            set({
                error: 'Failed to load portfolio data. Please try refreshing.',
                isLoading: false
            });
        }
    },

    // Reset hasFetched to force refetch on next homepage visit
    refreshData: () => {
        set({ hasFetched: false });
    }
}));
