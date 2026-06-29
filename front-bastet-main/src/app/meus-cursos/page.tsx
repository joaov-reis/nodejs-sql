"use client";

import { useEffect, useState } from "react";
import { CursosMockup } from "@/lib/mockup";
import Curso from "@/components/curso";
import type { Curso as CursoType } from "@/lib/mockup";

export default function MeusCursosPage() {
  const [meusCursos, setMeusCursos] = useState<CursoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarCursos() {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para ver seus cursos.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/enrollments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const listaMatriculas = data.enrollments || data;
        const idsMatriculados: string[] = listaMatriculas.map((mat: any) =>
          String(mat.courseId || mat.cursoId || mat),
        );

        const filtrados = CursosMockup.filter((curso) =>
          idsMatriculados.includes(String(curso.id)),
        );

        setMeusCursos(filtrados);
      } else {
        setError("Não foi possível carregar seus cursos.");
      }
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  // 👇 NOVA FUNÇÃO: Dispara o cancelamento via PATCH
  async function handleCancelarMatricula(cursoId: string) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar sua matrícula neste curso?",
    );
    if (!confirmar) return;

    try {
      // Decodifica o token para pegar o studentId necessário para o corpo, caso seu backend peça
      const payloadBase64 = token.split(".")[1];
      const payloadDecodificado = JSON.parse(atob(payloadBase64));
      const studentId = payloadDecodificado.id;

      const response = await fetch("http://localhost:3333/enrollments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        studentId: studentId,
        courseId: Number(cursoId)
      }),
    });

      if (response.ok) {
      alert("Matrícula cancelada com sucesso!");
      
      // 👇 EM VEZ DE FILTRAR, ATUALIZAMOS O ATRIBUTO DO CURSO
      setMeusCursos((cursosAtuais) =>
        cursosAtuais.map((curso) =>
          String(curso.id) === String(cursoId)
            ? { ...curso, inscricao_cancelada: true } // Marca como cancelado localmente
            : curso
        )
      );
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.message || "Erro ao cancelar a matrícula.");
    }
  } catch (error) {
    console.error("Erro ao cancelar:", error);
    alert("Erro de conexão com o servidor.");
  }
}

  useEffect(() => {
    carregarCursos();
  }, []);

  if (loading) return <p className="p-6">Carregando seus cursos...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <main className="p-6 flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-indigo-900">Meus Cursos</h2>

      {meusCursos.length === 0 ? (
        <p className="text-slate-500">
          Você ainda não está matriculado em nenhum curso.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
  {meusCursos.map((curso: CursoType) => (
    <Curso
      key={curso.id}
      // 👇 AGORA PASSA O ESTADO REAL: se 'inscricao_cancelada' for true no estado, o componente vai saber
      data={{ 
        ...curso, 
        inscrito: curso.inscricao_cancelada ? false : true, 
        inscricao_cancelada: curso.inscricao_cancelada || false 
      }}
      onMatricula={handleCancelarMatricula} 
    />
  ))}
</div>
      )}
    </main>
  );
}
