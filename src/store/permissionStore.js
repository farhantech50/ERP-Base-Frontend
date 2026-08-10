import { create } from "zustand";
import api from "../config/api";

export const usePermissionStore = create((set) => ({
  permissions: [],
  loading: false,
  error: null,

  fetchMyPermissions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/permissions/my-permissions");
      const data = res.data || [];
      set({ permissions: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
      set({ error: error.message, loading: false });
    }
  },

  clearPermissions: () => {
    set({ permissions: [] });
  }
}));
