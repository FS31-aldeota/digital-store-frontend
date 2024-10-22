import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
    baseURL: "https://digital-store-backend-c4an.onrender.com"
    // baseURL: "http://localhost:8000"
})

export const queryClient = new QueryClient();