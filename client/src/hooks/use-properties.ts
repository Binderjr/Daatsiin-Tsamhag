import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertProperty } from "@shared/routes";

export function useProperties(params?: { status?: string }) {
  return useQuery({
    queryKey: [api.properties.list.path, params?.status],
    queryFn: async () => {
      // Manually construct URL with query params if needed, or filter client-side if API doesn't support query params yet
      // Assuming basic list fetches all and we filter client side based on schema, 
      // but for robustness we'll just fetch the list.
      const res = await fetch(api.properties.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = api.properties.list.responses[200].parse(await res.json());
      
      // Client-side filtering if the API doesn't support query params yet (based on current routes.ts definition)
      if (params?.status) {
        return data.filter(p => p.status === params.status);
      }
      return data;
    },
  });
}

export function useProperty(id: number) {
  return useQuery({
    queryKey: [api.properties.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.properties.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch property");
      return api.properties.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertProperty) => {
      const res = await fetch(api.properties.create.path, {
        method: api.properties.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
           const error = api.properties.create.responses[400].parse(await res.json());
           throw new Error(error.message);
        }
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to create property");
      }
      return api.properties.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.properties.list.path] });
    },
  });
}
