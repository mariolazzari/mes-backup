import { ActionState } from "./ActionState";

export type FormAction = (
  prevState: ActionState,
  formData: FormData
) => Promise<ActionState>;
