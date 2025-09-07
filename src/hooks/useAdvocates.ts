// hooks/useAdvocates.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { advocatesApi } from "../lib/api";
import { Advocate } from "@/lib/types";

export const ADVOCATES_QUERY_KEY = ["advocates"] as const;

export function useAdvocates() {
  return useQuery({
    queryKey: ADVOCATES_QUERY_KEY,
    queryFn: advocatesApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateAdvocates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: advocatesApi.create,
    onSuccess: () => {
      // Invalidate and refetch advocates after successful creation
      queryClient.invalidateQueries({ queryKey: ADVOCATES_QUERY_KEY });
    },
  });
}

// Custom hook for filtering advocates
export function useAdvocateFilter(advocates: Advocate[], searchTerm: string) {
  if (!searchTerm) return advocates;

  return advocates.filter((advocate) => {
    const term = searchTerm.toLowerCase();
    return (
      advocate.firstName.toLowerCase().includes(term) ||
      advocate.lastName.toLowerCase().includes(term) ||
      advocate.city.toLowerCase().includes(term) ||
      advocate.degree.toLowerCase().includes(term) ||
      advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(term)
      ) ||
      advocate.yearsOfExperience.toString().includes(term)
    );
  });
}
