import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
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
      <Card className="w-[350px] bg-orange-400/80 text-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="david@bowie.com"
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="rebel123"
                  className="bg-white"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-5">
          <article className="flex flex-col items-center justify-center gap-2">
            <Button className="bg-emerald-500 text-white cursor-pointer w-full">
              Entrar
            </Button>
            <p>ou</p>

            <Button className="bg-emerald-500 text-white cursor-pointer w-full">
              Logar com google
            </Button>
          </article>
          <Label className="ml-2">
            Se você não tem conta,
            <Link href="" className="hover:underline hover:text-green-300">
              clique aqui
            </Link>
          </Label>
        </CardFooter>
      </Card>
    </div>
  );
}
