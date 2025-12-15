import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      
      {/* Placeholder pour les sections suivantes (pour voir que ça scrolle) */}
      <div className="h-[100vh] bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center">
        <p className="text-slate-400">Section Projets (À venir)</p>
      </div>
    </main>
  );
}