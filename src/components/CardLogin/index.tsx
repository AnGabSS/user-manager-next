import { faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

const CardLogin = () => {
  const buttonStyle = "bg-orange-400 text-white cursor-pointer w-full p-6";
  const inputStyle = "bg-white text-zinc-900 w-full p-6";
  return (
    <Card className="w-full h-full p-10 bg-emerald-500/80 text-white shadow-xl rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                placeholder="david@bowie.com"
                className={inputStyle}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="rebel123"
                className={inputStyle}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-5">
        <article className="flex flex-col items-center justify-center gap-2">
          <Button className={buttonStyle}>Entrar</Button>

          <p>ou</p>

          <Button className={buttonStyle}>
            <FontAwesomeIcon icon={faGooglePlus} className="text-emerald-600" />
            Logar com google
          </Button>
        </article>
        <Label className="ml-2">
          Se você não tem conta,{" "}
          <a
            href=""
            className="hover:underline text-orange-600 hover:text-green-400"
          >
            clique aqui
          </a>
        </Label>
      </CardFooter>
    </Card>
  );
};

export default CardLogin;
