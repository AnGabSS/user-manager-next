import { deleteUser } from "@/api/delete-user";
import { getUsers } from "@/api/get-users";
import { PaginatedUserFieldsInterface } from "@/types/PaginatedUserResponseInterface";
import { isAxiosError } from "axios";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import PaginationControls from "../PaginationControls";
import SkeletonTable from "../SkeletonTable";
import TableComponent from "../TableComponent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const UserTable = () => {
  const [data, setData] = useState<PaginatedUserFieldsInterface>();
  const [type, setType] = useState<"all" | "inactive">("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER" | undefined>();

  const _getUsers = useCallback(async () => {
    try {
      const users = await getUsers(
        { page, perPage, filter: search, ...(role && { role }) },
        type === "inactive"
      );
      setData(users);
    } catch (error) {
      if (isAxiosError(error) && error.code === "401") {
        window.location.href = "/edit";
      }
    }
  }, [page, perPage, search, role, type]);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setData(undefined);
    _getUsers();
  }, [_getUsers]);

  const onEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const onDelete = async (id: string) => {
    try {
      await deleteUser(id);
      _getUsers();
    } catch {
      toast.error("Erro ao fazer login.", {
        description: "Houve um erro ao buscar os usuários.",
        cancel: {
          label: "X",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  return (
    <Card className="w-full h-full rounded-lg p-2 bg-emerald-500/80 overflow-hidden text-white shadow-xl border border-solid border-emerald-400/70 gap-2">
      <Toaster position="bottom-right" richColors />
      <CardHeader className="text-center">
        <CardTitle className="text-3xl pt-6">Usuários</CardTitle>
        <div className="flex flex-row flex-wrap justify-between gap-4 pt-4">
          <article className="w-full flex flex-col md:w-1/5 text-sm">
            <Label className="w-full text-sm">Pesquisar</Label>
            <Input
              type="search"
              placeholder="Buscar por nome"
              className="w-full  p-2 rounded-lg border border-solid border-emerald-400/70 bg-white text-zinc-900"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              value={search}
            />
          </article>

          <article className="w-full flex flex-col md:w-1/5 text-sm">
            <Label className="w-full text-sm">Perfil</Label>
            <select
              value={role || ""}
              onChange={(e) => {
                const selected = e.target.value;
                setRole(selected === "" ? undefined : (selected as "ADMIN" | "USER"));
                setPage(1); // Resetar para primeira página
              }}
              className="w-full p-2 rounded-lg border border-solid border-emerald-400/70 bg-white text-zinc-900"
            >
              <option value="">Todos</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuário</option>
            </select>
          </article>
        </div>
      </CardHeader>

      <CardContent className="m-0 p-0">
        <nav className="flex justify-center gap-6 text-lg px-4 pb-4">
          <article
            className={`hover:text-orange-300 cursor-pointer hover:bg-emerald-400/50 rounded-xl px-4 py-2 ${type === "all" ? "bg-emerald-400/50" : ""}`}
            onClick={() => {
              setPage(1);
              setType("all");
            }}
          >
            Todos
            {type === "all" && <hr className="border-b-2" />}
          </article>
          <article
            className={`hover:text-orange-300 cursor-pointer hover:bg-emerald-400/50 rounded-xl px-4 py-2 ${type === "inactive" ? "bg-emerald-400/50" : ""}`}
            onClick={() => {
              setPage(1);
              setType("inactive");
            }}
          >
            Inativos
            {type === "inactive" && <hr className="border-b-2" />}
          </article>
        </nav>

        {!data && <SkeletonTable perPage={perPage} />}

        {data && data.items.length === 0 && (
          <div className="w-full flex overflow-auto rounded-xl flex-col justify-center items-center bg-emerald-500/80 text-white shadow-xl border border-solid border-emerald-400/70">
            <div className="w-full">
              <section className="p-10 text-center text-2xl">
                Nenhum usuário encontrado
              </section>
            </div>
          </div>
        )}

        {data && data.items.length > 0 && (
          <>
            <TableComponent
              data={data.items}
              columns={[
                { key: "name", label: "Nome" },
                { key: "email", label: "Email" },
                { key: "createdAt", label: "Criado em" },
                { key: "lastLoginAt", label: "Ultimo Acesso" },
              ]}
              className="w-full"
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <PaginationControls
              page={data.currentPage}
              pagesPerView={perPage}
              onPageChange={onPageChange}
              pageSize={perPage}
              setPageSize={setPerPage}
              lastPage={data.lastPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTable;
