import router from "next/router";
import { api } from "../lib/api";

export const getCourses = () => api.get("/course");
export const postCourses = () => api.post("/course");