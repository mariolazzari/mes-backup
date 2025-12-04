export type ActionState = {
  success: boolean;
  errors: string[];
};

export const initialActionState: ActionState = {
  success: false,
  errors: [],
};
