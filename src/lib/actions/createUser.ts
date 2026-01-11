"use server";
import { registerSchema } from "@/validations/user";
import { prisma } from "@/lib//prisma";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

// バリデーションエラー処理
function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  const castedFieldErrors = fieldErrors as Record<string, string[]>;

  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, confirmPassword: formErrors },
    };
  }
  return { success: false, errors: castedFieldErrors };
}

// カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームから値を取得
  const rawFormData = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map((field) => [
      field,
      formData.get(field) as string,
    ])
  ) as Record<string, string>;

  // バリデーションを動かす
  const validateionResult = registerSchema.safeParse(rawFormData);
  if (!validateionResult.success) {
    return handleValidationError(validateionResult.error);
  }

  // 存在チェック
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFormData.email },
  });
  if (existingUser) {
    return handleError({
      email: ["このメールアドレスは既に使用されています"],
    });
  }

  // ユーザー作成
  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);
  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    },
  });

  // リダイレクト処理(/dashboardへ遷移)
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false,
  });
  redirect("/dashboard");
}
