import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonUserForm = () => {
  return (
    <Card className="w-full rounded-lg h-full p-4 bg-emerald-500/80 text-white shadow-xl border border-emerald-500/80">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">
          <Skeleton className="w-1/2 h-8 mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 md:p-6">
        <div className="flex flex-row flex-wrap">
          {/* Campo 1 */}
          <div className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
            <Skeleton className="h-10 w-full bg-white" />
          </div>
          {/* Campo 2 */}
          <div className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
            <Skeleton className="h-10 w-full bg-white" />
          </div>
          {/* Campo 3 */}
          <div className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
            <Skeleton className="h-10 w-full bg-white" />
          </div>
          {/* Campo 4 */}
          <div className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
            <Skeleton className="h-10 w-full bg-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonUserForm;
