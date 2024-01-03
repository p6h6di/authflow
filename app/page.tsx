import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-white border-2 rounded-lg w-1/2">
        <div className="p-8">
          <h1 className="text-4xl font-bold">Authentication</h1>
          <p className="text-zinc-500 text-sm">
            Its a demo Authentication project.
          </p>
          <Button>Get started</Button>
        </div>
      </div>
    </main>
  );
}
