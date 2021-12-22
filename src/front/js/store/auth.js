import create from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set, get) => ({
      // Register endpoints state
      registering: false,
      registerSuccess: false,
      registerError: null,

      // Login endpoints state
      loging: false,
      token: null, // Having a token here means I am authenticated
      loginError: null,

      registerUser: async (email, password) => {
        set({ registering: true });
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (response.status === 204) {
            set({ registerSuccess: true, registering: false });
          } else {
            set({
              registerSuccess: false,
              registering: false,
              registerError: new Error("Unsuccessful Registration"),
            });
          }
        } catch (error) {
          set({ registering: false, registerError: error });
        }
      },

      loginUser: async (email, password) => {
        set({ loging: true });
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          if (response.status === 200) {
            const data = await response.json();
            set({ token: data.token, loging: false });
          } else {
            set({
              token: null,
              loging: false,
              loginError: new Error("Unsuccessful Login"),
            });
          }
        } catch (error) {
          set({ loging: false, loginError: error });
        }
      },
    }),
    { name: "auth", getStorage: () => sessionStorage }
  )
);
