import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jensen Omega — Software Developer</title>
        <meta name="description" content="Portfolio de développeur de Jensen Omega" />
      </Head>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh]">
        {/* Left Text */}
        <div className="md:w-1/2 flex flex-col justify-center mt-10 md:mt-0">
          <h2 className="text-3xl font-bold text-white mb-2">Hello<span className="text-primary">.</span></h2>

          <div className="flex items-center mb-6">
            <div className="w-10 h-[2px] bg-primary mr-4"></div>
            <p className="text-xl text-text-main font-light">Je suis Jensen</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
            Software <br /> Developer
          </h1>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-primary hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-sm shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1">
              Proposer un projet
            </button>
            <button className="border border-text-muted text-text-main hover:border-primary hover:text-primary font-medium px-8 py-3 rounded-sm transition-all">
              Mon CV
            </button>
          </div>

          <div className="flex flex-wrap gap-8 text-text-muted text-sm font-semibold uppercase tracking-wider">
            <span className="hover:text-primary transition-colors cursor-default">HTML5</span>
            <span className="hover:text-primary transition-colors cursor-default">CSS3</span>
            <span className="hover:text-primary transition-colors cursor-default">Javascript</span>
            <span className="hover:text-primary transition-colors cursor-default">React</span>
            <span className="hover:text-primary transition-colors cursor-default">Next.js</span>
          </div>
        </div>

        {/* Right Image/Visual */}
        <div className="md:w-1/2 flex justify-center relative">
          {/* Background glowing circle */}
          <div className="absolute top-0 right-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-3xl -z-10"></div>

          {/* Decorative Ring */}
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-text-muted/10 rounded-full"></div>

            {/* Profile Image Container */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-card-bg shadow-2xl bg-card-bg flex items-center justify-center">
              {/* Placeholder for user image - replacing Next/Image with img for simplicity if config missing */}
              <img
                src="https://via.placeholder.com/400x400/1E293B/ffffff?text=Jensen"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-card-bg py-20 my-10 relative overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

          {/* Stats Column */}
          <div className="space-y-12">
            <div className="flex items-start space-x-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl text-primary font-bold">01</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Développement Web</h3>
                <p className="text-text-muted">Création de sites modernes et responsives.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl text-primary font-bold">02</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Applications Mobiles</h3>
                <p className="text-text-muted">Des expériences fluides sur iOS et Android.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl text-primary font-bold">03</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Hébergement</h3>
                <p className="text-text-muted">Solutions cloud sécurisées et rapides.</p>
              </div>
            </div>
          </div>

          {/* Description Column */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">À propos de moi</h2>
            <p className="text-text-muted leading-relaxed mb-8">
              J'ai commencé mon parcours logiciel par la photographie. À travers cela, j'ai appris le processus de création à partir de zéro. Depuis, cela m'a conduit au développement logiciel car cela comble mon amour pour l'apprentissage et la construction de choses.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">120+</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">Projets terminés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
