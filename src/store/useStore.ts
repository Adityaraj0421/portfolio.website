import { create } from 'zustand'

interface State {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    isGateOpen: boolean
    toggleGate: () => void
}

export const useStore = create<State>((set) => ({
    isLoading: true,
    setIsLoading: (loading) => set({ isLoading: loading }),
    isGateOpen: false,
    toggleGate: () => set((state) => ({ isGateOpen: !state.isGateOpen })),
}))
