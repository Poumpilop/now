import Post from "@/components/posts/editor/Post";
import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import Image from "next/image";
import ForYouFeed from "./ForYouFeed";
import RightSideBar from "./RightSideBar";

export default function Home() {

  return (
    <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <section className="flex-grow space-y-6 max-w-4xl">
          <PostEditor />
            <ForYouFeed />
          </section>
          <RightSideBar />
      </div>
    </main>
  );
}
