"use client";
import Link from "next/link";

export default function Page() {
  async function handleSubmit(event) {
    event.preventDefault(); // Impede a página de recarregar do jeito antigo

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3333/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Erro ao realizar cadastro.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="page-title">Cadastro</h2>
        <p>
          Eu já tenho cadastro, quero <Link href="/login">fazer login.</Link>
        </p>

        <div className="max-w-96 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              required
              name="name"
              id="name"
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="birthDate">Data de nascimento</label>
            <input
              type="date"
              required
              name="birthDate"
              id="birthDate"
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              required
              name="password"
              id="password"
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between items-end">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  );
}
