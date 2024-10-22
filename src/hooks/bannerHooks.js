import { useMutation, useQuery } from "@tanstack/react-query";
import { API, queryClient } from "../services";

export const useGetBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await API.get("/banners");
      return response.data;
    },
    refetchOnWindowFocus: false
  })
}

export const useCreateBanner = (() => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/banners", data, {
        headers: {
            "Content-type": "multipart/form-data"
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"]
      })
    }
  })
});

export const useUpdateBanner = (() => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.put(`/banners`, data, {
        headers: {
            "Content-type": "multipart/form-data"
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"]
      })
    }
  })
});

export const useDestroyBanner = (() => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await API.delete(`/banners/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"]
      })
    }
  })
});