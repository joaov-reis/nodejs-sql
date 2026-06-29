import router from "next/router";
import { api } from "../lib/api";

export const getAuth = () => api.get("/me");
export const postLogin = () => api.post("/login");
export const postLogout = () => api.post("/logout");