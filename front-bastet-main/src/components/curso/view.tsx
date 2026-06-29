import type { Curso as CursoType } from "@/lib/mockup";

interface CursoViewProps {
  data: CursoType;
  onMatricula: (id: number) => void; 
}

export default function CursoView({ data, onMatricula }: CursoViewProps) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm flex flex-col justify-between gap-4">
      <div>
        <img src={data.capa} alt={data.nome} className="w-full h-40 object-cover rounded-xl mb-4" />
        <h3 className="text-xl font-bold text-slate-800">{data.nome}</h3>
        <p className="text-sm text-slate-600 mt-2">{data.descricao}</p>
      </div>
      
      <button
        onClick={() => onMatricula(data.id)}
        className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
          data.inscrito && !data.inscricao_cancelada
            ? "bg-emerald-100 text-emerald-700"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {data.inscrito && !data.inscricao_cancelada ? "Já Matriculado" : "Matricular-se"}
      </button>
    </div>
  );
}