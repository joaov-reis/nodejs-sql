import router from "next/router";
import { api } from "../lib/api";

export const getStudents = () => api.get("/students");
export const postStudent = () => api.post("/students");
export const postRefresh = () => api.post("/students/refresh");