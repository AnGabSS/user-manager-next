import CardLogin from "@/components/CardLogin";
import background from "../../public/background.png";
import UserForm from "@/components/UserForm/UserForm";
import { UserResponseInterface } from "@/types/UserResponseInterface";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/get-user-by-id";

export default function Edit() {
  const [user, setUser] = useState<UserResponseInterface>();

  const id = window.location.pathname.split("/")[2];

  const _getUserById = async () => {
    const response = await getUserById(id);
    setUser(response);
  };

  useEffect(() => {
    _getUserById();
  }, []);

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

        <UserForm isEdit={true} data={user} /> 
      </section>
    </div>
  );
}
