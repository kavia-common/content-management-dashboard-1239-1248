import PostEditor from "@/components/PostEditor";

export const metadata = {
  title: "New Post",
  description: "Create a new blog post.",
};

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Create Post</h1>
        <p className="text-sm text-gray-500">Write and publish content with ease.</p>
      </header>
      <PostEditor />
    </div>
  );
}
