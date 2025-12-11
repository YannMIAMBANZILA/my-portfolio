export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">

        {/* Hero */}
        <section id="hero" className="flex flex-col items-start gap-6 pt-8">
  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
    Disponible en alternance
  </p>
  <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
    Développeur web.
  </h1>
  <p className="max-w-xl text-base text-zinc-600 dark:text-zinc-400">
    Je conçois des solutions digitales modernes, performantes et maintenables.{" "}
    Actuellement en 3ᵉ année du Bachelor Technologies Digitales chez{" "}
    <a
      href="https://www.digital-campus.fr/formation/bachelor-dev"
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-4"
    >
      Digital Campus Paris
    </a>
    , je recherche une alternance pour approfondir mes compétences.
  </p>
  <div className="flex flex-col gap-3 sm:flex-row">
    <a
      href="/cv.pdf"
      className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      Télécharger le CV
    </a>
    <a
      href="#contact"
      className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
    >
      Me contacter
    </a>
  </div>
</section>


        {/* Projets */}
        <section id="projects" className="space-y-4">
          <h2 className="text-2xl font-semibold">Projets</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Une sélection de projets représentatifs de ma manière de travailler.
          </p>
          <div className="space-y-4">
            {/* Cartes projets à remplir plus tard */}
              <article className="rounded-lg border border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
  <h3 className="text-lg font-medium">Vera – Chat with Vera</h3>
  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
    Application web de type assistant conversationnel permettant d&apos;échanger
    avec &quot;Vera&quot; pour accompagner les utilisateurs dans leurs démarches.
  </p>
  <p className="mt-2 text-xs font-medium uppercase text-zinc-500">
    Stack : TypeScript, NestJS, Angular, MongoDB
  </p>
  <div className="mt-3 flex flex-wrap gap-3 text-sm">
    <a
      href="https://github.com/TON-UTILISATEUR/vera-app"
      target="_blank"
      rel="noreferrer"
      className="text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
    >
      Code source
    </a>
    <a
      href="https://chat-with-vera.vercel.app/"
      target="_blank"
      rel="noreferrer"
      className="text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
    >
      Démo
    </a>
  </div>
</article>

          </div>
        </section>

        {/* Compétences */}
        <section id="skills" className="space-y-4">
          <h2 className="text-2xl font-semibold">Compétences</h2>
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="font-medium">Backend</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                NestJS, Node.js, REST API, MongoDB, PostgreSQL
              </p>
            </div>
            <div>
              <h3 className="font-medium">Frontend</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                React, Next.js, Angular, Tailwind CSS
              </p>
            </div>
            <div>
              <h3 className="font-medium">DevOps & outils</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Docker, Git/GitHub, n8n, CI/CD, tests, VSCode
              </p>
            </div>
          </div>
        </section>

        {/* À propos */}
        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-semibold">À propos</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Court texte sur ton parcours, ta formation en B3, ta manière de travailler, 
            ce que tu recherches en alternance, etc.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-4 pb-16">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tu as une opportunité d’alternance ou un projet à me proposer ? 
            Contacte-moi via le formulaire ou sur mes réseaux.
          </p>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-800"
                  placeholder="Votre nom"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-800"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-800"
                placeholder="Parlez-moi de votre besoin…"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Envoyer
            </button>
          </form>

          <div className="mt-4 text-sm">
            <p className="font-medium">Réseaux</p>
            <div className="mt-1 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                className="text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                className="text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
