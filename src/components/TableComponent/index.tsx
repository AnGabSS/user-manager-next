import { ColumnInterface } from "@/types/ColumnInterface";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnInterface[];
  className?: string;
  style?: React.CSSProperties;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TableComponent = ({
  data,
  columns,
  className,
  style,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div
      className={`w-full flex overflow-hidden rounded-xl flex-col justify-center items-center ${className}`}
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
              {canEdit && (
                <th className="px-6 py-2 text-md md:text-lg">Editar</th>
              )}
              {canDelete && (
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
                    {row[column.key]}
                  </td>
                ))}
                {canEdit && (
                  <td className="px-6 py-2 md:px-9 md:py-3 text-lg md:text-md">
                    <p className="text-center w-full flex justify-center items-center cursor-pointer">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={onEdit ? () => onEdit(row.id) : undefined}
                        style={{ color: "#26a269" }}
                      />
                    </p>
                  </td>
                )}
                {canDelete && (
                  <td className="px-6 py-2 md:px-9 md:py-3 text-lg md:text-md">
                    <p className="text-center w-full flex justify-center items-center cursor-pointer">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={onDelete ? () => onDelete(row.id) : undefined}
                        style={{ color: "#e01b24" }}
                      />
                    </p>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
