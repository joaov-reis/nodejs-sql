"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Dados recebidos do login:", result); // Para você testar no F12!
        if (result.token) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("userName", result.name);
        }
        alert("Login realizado com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-indigo-50 max-w-96 rounded-3xl flex flex-col gap-4"
      >
        <h2 className="page-title">Login</h2>

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

        <div className="flex flex-row justify-between items-end">
          <Link href="/cadastro" className="my-3">
            Fazer cadastro
          </Link>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}
