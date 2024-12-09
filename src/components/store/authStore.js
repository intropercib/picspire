import { create } from "zustand"
const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("userInfo")),
    login: (user) => {
        localStorage.setItem("userInfo", JSON.stringify(user))
        set({ user })
    },
    logout: () => {
        localStorage.removeItem("userInfo")
        set({ user: null })
    },
}))

export default useAuthStore