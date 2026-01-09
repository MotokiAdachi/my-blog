import { getPost } from "@/lib/post";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Params) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) {
    notFound();
  }

  return <div></div>;
}
