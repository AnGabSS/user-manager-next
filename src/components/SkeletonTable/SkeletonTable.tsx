import { Skeleton } from "../ui/skeleton";

interface Props {
  perPage: number;
}

const SkeletonTable = ({ perPage }: Props) => {
  return (
    <div className="w-full overflow-auto rounded-xl bg-emerald-500/80 text-white shadow-xl border border-solid border-emerald-400/70 px-4 py-6 space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-6 bg-white" />
        <Skeleton className="h-6 bg-white" />
        <Skeleton className="h-6 bg-white" />
        <Skeleton className="h-6 bg-white" />
      </div>

      {[...Array(perPage)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          <Skeleton className="h-6 bg-white" />
          <Skeleton className="h-6 bg-white" />
          <Skeleton className="h-6 bg-white" />
          <Skeleton className="h-6 bg-white" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
