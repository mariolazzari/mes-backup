import { ActionState } from "@/types/ActionState";

// get message error from exception
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

// return no action error
export function noActionError(): ActionState {
  return {
    success: true,
    errors: {},
  };
}

// return action error
export function actionError<T>(key: keyof T, value: string): ActionState {
  return {
    success: false,
    errors: { [key]: value },
  };
}

// return general error
export function generalError(ex: unknown, msg: string): ActionState {
  const general = `${msg} ${getErrorMessage(ex)}`;

  return {
    success: false,
    errors: { general },
  };
}
