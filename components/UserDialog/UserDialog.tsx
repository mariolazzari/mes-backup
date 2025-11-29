import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserDialogProps } from ".";

export function UserDialog({ payload }: UserDialogProps) {
  const { email, iat, exp } = payload;

  const renderInitials = () => {
    const tokens = email.split("@")[0].split(".");
    return tokens.map(t => t.charAt(0).toUpperCase()).join("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
          <span className="font-semibold">{renderInitials()}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Utente</DialogTitle>
          <DialogDescription>{email}</DialogDescription>
        </DialogHeader>

        <ul>
          <li className="flex justify-between w-80">
            Login {new Date(iat).toTimeString()}
          </li>
          <li className="flex justify-between w-80">
            Logout {new Date(exp).toTimeString()}
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
