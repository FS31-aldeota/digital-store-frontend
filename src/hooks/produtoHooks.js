import { useMutation, useQuery } from "@tanstack/react-query";
import { API, queryClient } from "../services";

export const useGetProdutos = () => {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const response = await API.get("/produtos");
      return response.data;
    },
    refetchOnWindowFocus: false
  })
}

export const useCreateProduto = (() => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/produtos", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["produtos"]
      })
    }
  })
});

export const useUpdateProduto = (() => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.put(`/produtos`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["produtos"]
      })
    }
  })
});

export const useDestroyProduto = (() => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await API.delete(`/produtos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["produtos"]
      })
    }
  })
});