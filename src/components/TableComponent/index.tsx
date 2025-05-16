import { ColumnInterface } from "@/types/ColumnInterface";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { formatDate } from "@/lib/utils";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnInterface[];
  className?: string;
  style?: React.CSSProperties;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TableComponent = ({
  data,
  columns,
  className,
  style,
  onEdit,
  onDelete,
}: Props) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    if (deleteId && onDelete) {
      onDelete(deleteId);
      setDialogOpen(false);
      setDeleteId(null);
    }
  };


  return (
    <>
      <div
        className={`w-full flex overflow-auto rounded-xl flex-col justify-center items-center ${className}`}
        style={style}
      >
        <div className="w-full">
          <table className="w-full bg-orange-50">
            <thead className="bg-emerald-500 text-white border-b-2 border-solid border-emerald-500">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-2 text-md md:text-lg">
                    {column.label}
                  </th>
                ))}
                {onEdit && (
                  <th className="px-6 py-2 text-md md:text-lg">Editar</th>
                )}
                {onDelete && (
                  <th className="px-6 py-2 text-md md:text-lg">Excluir</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-solid border-orange-500/70 divide-x divide-solid divide-orange-500/10 hover:bg-orange-500/10 transition delay-20 duration-100 ease-in-out hover:shadow-xl text-green-900"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-2 md:px-9 md:py-3 text-sm md:text-md"
                    >
                      {(row[column.key] instanceof Date ||
                        (typeof row[column.key] === "string" && !isNaN(new Date(row[column.key]).getTime())))
                        ? formatDate(row[column.key])
                        : row[column.key]}
                    </td>
                  ))}
                  {onEdit && (
                    <td className="px-6 py-2 md:px-9 md:py-3 text-lg md:text-md">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => onEdit(row.id)}
                          style={{ color: "#26a269", cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  )}
                  {onDelete && (
                    <td className="px-6 py-2 md:px-9 md:py-3 text-lg md:text-md">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => {
                            setDeleteId(row.id);
                            setDialogOpen(true);
                          }}
                          style={{ color: "#e01b24", cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <DeleteDialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setDeleteId(null);
            }}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </>
  );
};

export default TableComponent;
