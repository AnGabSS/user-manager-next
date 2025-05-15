import { generateMockUsers } from "@/mock/generateUsers";
import { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const UserTable = () => {
  const [data, setData] = useState<object[]>([]);
  const [type, setType] = useState<"all" | "inactive">("all");

  useEffect(() => {
    const users = generateMockUsers(10).data.items;
    setData(users);
  }, []);

  if (data.length === 0) return <p>Carregando...</p>;
  return (
    <Card className="w-full h-full rounded-lg p-2 bg-emerald-500/80 oveflow-hidden text-white shadow-xl border border-solid border-emerald-400/70">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Usuários</CardTitle>
      </CardHeader>
      <CardContent className="m-0 p-0">
        <nav className="flex justify-center gap-6 text-lg p-4">
          <p
            className={`hover:text-orange-300 cursor-pointer hover:bg-emerald-400/50 rounded-xl px-4 py-2 ${
              type === "all" && "bg-emerald-400/50"
            }`}
            onClick={() => setType("all")}
          >
            Todos
            {type === "all" && <hr className="border-b-2" />}
          </p>
          <p
            className={`hover:text-orange-300 cursor-pointer hover:bg-emerald-400/50 rounded-xl px-4 py-2 ${
              type === "inactive" && "bg-emerald-400/50"
            }`}
            onClick={() => setType("inactive")}
          >
            Inativos
            {type === "inactive" && <hr className="border-b-2" />}
          </p>
        </nav>
        <TableComponent
          data={data}
          columns={[
            { key: "name", label: "Nome" },
            { key: "email", label: "Email" },
            { key: "createdAt", label: "Criado em" },
            { key: "updatedAt", label: "Atualizado em" },
          ]}
          className="w-full"
          canEdit={true}
          canDelete={true}
        />
      </CardContent>
    </Card>
  );
};

export default UserTable;
