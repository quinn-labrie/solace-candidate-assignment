import { Advocate } from "./types";

export const advocatesApi = {
  getAll: async (): Promise<Advocate[]> => {
    const response = await fetch("/api/advocates");
    if (!response.ok) {
      throw new Error("Failed to fetch advocates");
    }
    const data = await response.json();
    return data.data;
  },

  create: async (
    advocateData: Omit<Advocate, "id" | "createdAt">
  ): Promise<Advocate[]> => {
    const response = await fetch("/api/advocates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(advocateData),
    });
    if (!response.ok) {
      throw new Error("Failed to create advocates");
    }
    const data = await response.json();
    return data.advocates;
  },
};
