import { getUserById } from "@/api/get-user-by-id";
import SkeletonUserForm from "@/components/SkeletonUserForm/SkeletonUserForm";
import UserForm from "@/components/UserForm/UserForm";
import background from "@/public/background.png";
import { UserResponseInterface } from "@/types/UserResponseInterface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Edit() {
  const [user, setUser] = useState<UserResponseInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchUser = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const response = await getUserById(id);
        setUser(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    // Inicia o timeout de 40 segundos
    timeoutId = setTimeout(() => {
      setLoading(false);
      setTimeoutReached(true);
    }, 40000);

    fetchUser();

    return () => clearTimeout(timeoutId); // limpa o timeout se desmontar
  }, [id]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-4 min-h-screen"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="w-5/6 md:w-2/3">
        {loading && <SkeletonUserForm />}
        {!loading && timeoutReached && !user && (
          <p className="text-red-500 text-center font-semibold text-lg">
            Não foi possível encontrar o usuário, tente novamente mais tarde.
          </p>
        )}
        {!loading && user && (
          <UserForm
            isEdit={true}
            {...(user &&
              typeof id == "string" && { data: { id, values: user } })}
          />
        )}
      </section>
    </div>
  );
}
