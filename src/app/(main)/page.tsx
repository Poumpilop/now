import Post from "@/components/posts/editor/Post";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import Image from "next/image";
import ForYouFeed from "./ForYouFeed";

export default function Home() {

  return (
    <main className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
          <ForYouFeed />
      </div>
    </main>
  );
}
