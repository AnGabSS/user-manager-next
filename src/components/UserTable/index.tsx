import { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getUsers } from "@/api/get-users";
import { isAxiosError } from "axios";
import { PaginatedUserFieldsInterface, PaginatedUserResponseInterface } from "@/types/PaginatedUserResponseInterface";
import PaginationControls from "../PaginationControls";

const UserTable = () => {
  const [data, setData] = useState<PaginatedUserFieldsInterface>();
  const [type, setType] = useState<"all" | "inactive">("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const getUsersHere = async () => {
    try {
      const users = await getUsers({ page, perPage }, type === "inactive");
      setData(users);
    } catch (error) {
      if (isAxiosError(error) && error.code === "401") {
        window.location.href = "/edit";
      }
    }
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getUsersHere();
  }, [page, perPage, type]);

  if (!data?.items) return <p>Carregando...</p>;
  if (data.items.length === 0) return <p>Nenhum usuário encontrado</p>

  return (
    <Card className="w-full h-full rounded-lg p-2 bg-emerald-500/80 overflow-hidden text-white shadow-xl border border-solid border-emerald-400/70">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Usuários</CardTitle>
      </CardHeader>
      <CardContent className="m-0 p-0">
        <nav className="flex justify-center gap-6 text-lg p-4">
          <p
            className={`hover:text-orange-300 cursor-pointer hover:bg-emerald-400/50 rounded-xl px-4 py-2 ${type === "all" && "bg-emerald-400/50"
              }`}
            onClick={() => {
              setPage(1);
              setType("all");
            }}
          >
            Todos
            {type === "all" && <hr className="border-b-2" />}
          </p>
          <p
            className={`hover:text-orange-300 cursor-pointer hover:bg-emerald-400/50 rounded-xl px-4 py-2 ${type === "inactive" && "bg-emerald-400/50"
              }`}
            onClick={() => {
              setPage(1);
              setType("inactive");
            }}
          >
            Inativos
            {type === "inactive" && <hr className="border-b-2" />}
          </p>
        </nav>

        <TableComponent
          data={data.items}
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

        <PaginationControls
          page={data.currentPage}
          pagesPerView={perPage}
          onPageChange={onPageChange}
          pageSize={perPage}
          setPageSize={setPerPage}
          lastPage={data.lastPage}
        />
      </CardContent>
    </Card>
  );
};

export default UserTable;
