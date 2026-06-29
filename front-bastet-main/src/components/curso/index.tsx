import CursoView from "./view";
import type { Curso as CursoType } from "@/lib/mockup";

interface CursoProps {
  data: CursoType;
  onMatricula: (id: string) => void;
}

export default function Curso({ data, onMatricula }: CursoProps) {
  return <CursoView data={data} onMatricula={onMatricula} />;
}
