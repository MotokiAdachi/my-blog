"use server";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {}
