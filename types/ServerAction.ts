import { ActionState } from "./ActionState";

export type ServerAction = (
  prevState: ActionState,
  formData: FormData
) => Promise<ActionState>;
