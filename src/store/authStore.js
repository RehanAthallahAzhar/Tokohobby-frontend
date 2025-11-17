import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import api from '../api';

export const useAuthStore = create(
    persist(
    (set) => ({
      token: null,
      user: null,

      
      login: async (username, password) => {
        try {
          const response = await api.post('/api/v1/accounts/login', {
            username,
            password,
          });

          const { token, ...userData } = response.data.data;
          set({ token: token, user: userData });

        } catch (error) {
          console.error("Login failed:", error.response.data.error);
          throw new Error(error.response.data.error);
        }
      },

      register: async (formData) => {
        try {

          const response = await api.post('/api/v1/accounts/register', formData);
          return response.data;
        } catch (error) {
          console.error("Register failed:", error.response.data.error);
          throw new Error(error.response.data.error);
        }
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage, 
    }
  )
);