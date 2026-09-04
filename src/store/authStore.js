import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: null,
  profile: null,
  role: null,

  login: (token, profile, role) => set({ token, profile, role }),
  logout: () => set({ token: null, profile: null, role: null }),
  setRole: (role) => set({ role }),
}))
