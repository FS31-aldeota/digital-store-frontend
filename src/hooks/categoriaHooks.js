import { useMutation, useQuery } from "@tanstack/react-query";
import { API, queryClient } from "../services";

export const useGetCategorias = () => {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await API.get("/categorias");
      return response.data;
    },
    refetchOnWindowFocus: false
  })
}

export const useCreateCategoria = (() => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/categorias", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorias"]
      })
    }
  })
});

export const useUpdateCategoria = (() => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.put(`/categorias`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorias"]
      })
    }
  })
});

export const useDestroyCategoria = (() => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await API.delete(`/categorias/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorias"]
      })
    }
  })
});