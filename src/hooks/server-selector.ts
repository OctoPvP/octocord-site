import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ServerSelectorState = {
  value: string | null;
  setSelectedServer: (server: string | null) => void;
}
export const useServerSelector = create<ServerSelectorState>()(
  persist(
    (set) => ({
      value: null,
      setSelectedServer: (server) => set({ value: server }),
    }),
    {
      name: "serverSelector",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)