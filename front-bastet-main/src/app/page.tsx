"use client";
import { useEffect, useState } from "react";
import Curso from "@/components/curso";
import { CursosMockup } from "@/lib/mockup";
import type { Curso as CursoType } from "@/lib/mockup";

export default function Page() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const nome = localStorage.getItem("userName");
    if (nome && nome !== "undefined") {
      setUserName(nome);
    }
  }, []);

  async function handleMatricula(cursoId: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa fazer login para se matricular em um curso!");
    return;
  }

  try {
    // 👇 DECODIFICA O JWT PARA PEGAR O ID DO ALUNO SALVO NELE
    const payloadBase64 = token.split(".")[1]; // Pega a segunda parte do token (payload)
    const payloadDecodificado = JSON.parse(atob(payloadBase64));
    const studentId = payloadDecodificado.id; // Extrai o id do estudante

   const response = await fetch("http://localhost:3333/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      
      body: JSON.stringify({ 
        studentId: studentId,
        courseId: Number(cursoId)
      }),
    });

    if (response.ok) {
      alert("Matrícula realizada com sucesso!");
      window.location.reload(); 
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.message || "Erro ao tentar se matricular.");
    }
  } catch (error) {
    console.error("Erro na requisição de matrícula:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

  return (
    <main>
      {userName && (
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Olá, {userName}! Seja bem-vindo de volta.
        </h2>
      )}

      <h2 className="page-title">Cursos</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {CursosMockup.map((curso: CursoType) => (
          <Curso data={curso} key={curso.id} onMatricula={handleMatricula} />
        ))}
      </div>
    </main>
  );
}
