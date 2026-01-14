"use server";
import { postSchema } from "@/validations/post";
import { saveImage } from "@/utils/image";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export default async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームから値を取得
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;

  // バリデーション

  // 画像保存

  // DB保存
}
