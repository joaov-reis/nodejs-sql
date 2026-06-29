import router from "next/router";
import { api } from "../lib/api";

export const getEnrollments = () => api.get("/enrollments");
export const postEnrollment = () => api.post("/enrollments");
export const patchEnrollment = () => api.patch("/enrollments");