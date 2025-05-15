'use client'
import UserTable from "@/components/UserTable";
import background from "../../public/background.png";

export default function Users() {
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
        <UserTable />
      </section>
    </div>
  );
}
