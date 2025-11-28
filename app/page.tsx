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
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className="shadow-md">
        <form action={register}>
          <CardHeader>
            <CardTitle className="text-center mb-4">MES Login</CardTitle>
            <CardDescription>
              Inserisci qui la tua email per effettuare il login
            </CardDescription>
          </CardHeader>
          <CardContent className="w-[380px] h-20 my-4">
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="email">Mail utente</FieldLabel>
                <Input
                  className="focus:bg-primary-foreground"
                  id="email"
                  name="email"
                  placeholder="Indirizzo email..."
                  type="email"
                />
                <FieldError></FieldError>
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
