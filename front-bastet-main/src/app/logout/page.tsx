"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    router.push("/");

    router.refresh();
  }, [router]);


  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-slate-500 animate-pulse">Saindo do sistema...</p>
    </div>
  );
}
