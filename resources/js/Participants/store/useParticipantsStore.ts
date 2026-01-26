import { create } from 'zustand';

interface ParticipantsStore {
    fullname: string;
    position: string;
    setFullname: (fullname: string) => void;
    setPosition: (position: string) => void;
    resetForm: () => void;
}

export const useParticipantsStore = create<ParticipantsStore>((set) => ({
    fullname: '',
    position: '',
    setFullname: (fullname) => set({ fullname }),
    setPosition: (position) => set({ position }),
    resetForm: () => set({ fullname: '', position: '' }),
}));