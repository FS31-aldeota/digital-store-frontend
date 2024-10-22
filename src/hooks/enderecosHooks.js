import { useMutation } from "@tanstack/react-query";
import { API, queryClient } from "../services";


export const useCreateAddress = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await API.post("/enderecos", data);
            return response.data;
        }
    });
}