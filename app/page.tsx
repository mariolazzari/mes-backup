import { register } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="shadow-md">
        <form action={register}>
          <CardHeader>
            <CardTitle className="mx-auto">
              <Image src="/logo-icc.png" width={150} height={150} alt="Logo" />
            </CardTitle>
            <CardDescription className="text-3xl my-4">Login</CardDescription>
          </CardHeader>
          <CardContent className="w-[380px] h-20 my-4">
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  className="focus:bg-primary-foreground"
                  id="email"
                  name="email"
                  placeholder="Indirizzo email..."
                  type="email"
                />
              </Field>
            </FieldSet>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="cursor-pointer">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default HomePage;
