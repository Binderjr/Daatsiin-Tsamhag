import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertInvestment } from "@shared/routes";

export function useInvestments() {
  return useQuery({
    queryKey: [api.investments.list.path],
    queryFn: async () => {
      const res = await fetch(api.investments.list.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch investments");
      return api.investments.list.responses[200].parse(await res.json());
    },
    retry: false,
  });
}

export function useCreateInvestment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertInvestment) => {
      const res = await fetch(api.investments.create.path, {
        method: api.investments.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.investments.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to create investment");
      }
      return api.investments.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.investments.list.path] });
    },
  });
}
