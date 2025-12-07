export type ActionState = {
  success: boolean;
  errors: Partial<Record<string, string>>;
};

export const initialActionState: ActionState = {
  success: false,
  errors: {},
};
