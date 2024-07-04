import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useServerSelector = create(
  persist(
    (set, get) => ({
      selectedServer: null,
      setSelectedServer: (server: string) => {
        set({ selectedServer: server });
      },
    }),
    {
      name: "serverSelector",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)