import CardLogin from "@/components/CardLogin";
import background from "../../public/background.png";

export default function Home() {
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
      <section className="w-2/3">
        <CardLogin />
        {/* <UserTable />
        <UserForm isEdit={false} /> */}
      </section>
    </div>
  );
}
