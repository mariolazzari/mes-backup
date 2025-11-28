"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="flex w-full h-screen justify-center items-center">
          <Card className="p-8 shadow-md rounded-md">
            <CardHeader>
              <CardTitle>{error.name}</CardTitle>
              <CardDescription>Qualcosa è andato storto</CardDescription>
            </CardHeader>
            <CardContent className="max-w-xl">
              <p className="text-destructive">{error.message}</p>
              <p className="text-xs">{error.stack}</p>
            </CardContent>
            <CardFooter className="mx-auto">
              <Button onClick={reset}>Riprova</Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}

export default GlobalError;
