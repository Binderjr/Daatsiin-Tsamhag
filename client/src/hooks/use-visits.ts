import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type InsertVisit } from "@shared/routes";

export function useLogVisit() {
  return useMutation({
    mutationFn: async (data: InsertVisit) => {
      // Silent failure is acceptable for analytics
      try {
        await fetch(api.visits.log.path, {
          method: api.visits.log.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error("Failed to log visit", e);
      }
    },
  });
}

export function useVisitStats() {
  return useQuery({
    queryKey: [api.visits.stats.path],
    queryFn: async () => {
      const res = await fetch(api.visits.stats.path, { credentials: "include" });
      if (!res.ok) {
         if (res.status === 401) return null;
         throw new Error("Failed to fetch stats");
      }
      return api.visits.stats.responses[200].parse(await res.json());
    },
    retry: false,
  });
}
