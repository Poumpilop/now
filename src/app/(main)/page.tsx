"use client"
import dynamic from "next/dynamic";
import ForYouFeed from "./ForYouFeed";
import RightSideBar from "./RightSideBar";

export default function Home() {

  // Import du composant sans SSR
  const PostEditor = dynamic(() => import("@/components/posts/editor/PostEditor"), { ssr: false });

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
