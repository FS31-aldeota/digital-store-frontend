import { useMutation } from "@tanstack/react-query";
import { API, queryClient } from "../services";


export const useCreateUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await API.post("/usuarios", data);
            return response.data;
        }
    });
}

export const useLoginUser = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await API.post("/usuarios/login", data);
            return response.data;
        }
    });
}