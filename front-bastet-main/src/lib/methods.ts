import { UsurioMockup, type Curso, type Usuario } from "./mockup";
import router from "@/config/routes";
import { api } from "./api";

export async function getSession() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token");
    }

    const res = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return {
      authenticated: false,
      student: null,
    };
  }
}

export async function CreateUser(data: {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}) {
  const res = await api.post("/students", data);
  return res.data;
}

export async function Login(data: { email: string; senha: string }) {
  try {
    const res = await api.post("/login", data);
    return res.data;
  } catch {
    return {
      statusCode: 400,
      mensagem: "Erro ao fazer login",
    };
  }
}

export async function ListarCursos({ filtro }: { filtro?: string }) {
  const res = await api.get("/course", {
    params: filtro ? { filtro } : undefined,
  });

  return res.data;
}

export async function Inscricao({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: string;
}) {
  const res = await api.post("/enrollments", {
    studentId,
    courseId,
  });

  return res.data;
}

export async function Cancelar({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: string;
}) {
  const res = await api.patch("/enrollments", {
    studentId,
    courseId,
  });

  return res.data;
}

export async function MeusCursos() {
  const res = await api.get("/enrollments");
  return res.data;
}
