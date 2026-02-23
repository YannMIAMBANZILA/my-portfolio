import Head from 'next/head'
import ProjectCard from '../components/ProjectCard'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  const { t } = useTranslation('common')

  const projects = [
    { title: t('projects.list.aura.title'), description: t('projects.list.aura.desc'), link: 'https://github.com/YannMIAMBANZILA/aura_app' },
    { title: t('projects.list.chat_vera.title'), description: t('projects.list.chat_vera.desc'), link: 'https://github.com/YannMIAMBANZILA/chat-with-vera-back' },
    { title: t('projects.list.neumorphic.title'), description: t('projects.list.neumorphic.desc'), link: 'https://github.com/YannMIAMBANZILA/neumorphic-cards-light' },
    { title: t('projects.list.next_lab.title'), description: t('projects.list.next_lab.desc'), link: 'https://github.com/YannMIAMBANZILA/Tp_NextJs_X' },
    { title: t('projects.list.django_collection.title'), description: t('projects.list.django_collection.desc'), link: 'https://github.com/YannMIAMBANZILA/django_collection_yann_miambanzila' },
    { title: t('projects.list.python_lab.title'), description: t('projects.list.python_lab.desc'), link: 'https://github.com/YannMIAMBANZILA/evaluation_fin_de_module_python' },
  ]

  return (
    <>
      <Head>
        <title>Yann Miambanzila — Développeur Web full stack et intégrateur IA</title>
        <meta name="description" content="Portfolio de développeur de Yann Miambanzila" />
      </Head>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 pt-24 pb-12 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh] scroll-mt-20">
        {/* Left Text */}
        <div className="md:w-1/2 flex flex-col justify-center mt-10 md:mt-0">
          <h2 className="text-3xl font-bold text-text-main mb-2">{t('hero.greeting')}<span className="text-primary">.</span></h2>

          <div className="flex items-center mb-6">
            <div className="w-10 h-[2px] bg-primary mr-4"></div>
            <p className="text-xl text-text-main font-light">{t('hero.intro')}</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold aurora-text leading-tight mb-8 pb-2">
            {t('hero.role').includes('|') ? (
              <>
                {t('hero.role').split('|')[0]} <br />
                <span className="text-4xl md:text-5xl opacity-90">{t('hero.role').split('|')[1]}</span>
              </>
            ) : t('hero.role')}
          </h1>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#contact" className="bg-primary hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-sm shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1">
              {t('hero.cta_project')}
            </a>
            <button className="border border-text-muted text-text-main hover:border-primary hover:text-primary font-medium px-8 py-3 rounded-sm transition-all">
              {t('hero.cta_cv')}
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
          <div className="absolute top-0 right-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-primary/20 to-transparent rounded-full filter blur-3xl -z-10 animate-pulse"></div>
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            {/* The primary color shadow/glow behind the cut-out image */}
            <div className="absolute w-[80%] h-[80%] bg-primary/20 rounded-full filter blur-[100px] -z-10"></div>

            <Image
              src="/images/yann-profile.png"
              alt="Yann Miambanzila"
              width={450}
              height={450}
              priority
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(249,115,22,0.3)]"
            />

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-2 border-primary/30 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 border border-text-muted/10 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-card-bg py-20 relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="flex items-start space-x-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl text-primary font-bold">01</div>
              <div>
                <h3 className="text-xl font-bold text-text-main mb-2">{t('about.web_dev')}</h3>
                <p className="text-text-muted">{t('about.web_dev_desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl text-primary font-bold">02</div>
              <div>
                <h3 className="text-xl font-bold text-text-main mb-2">{t('about.mobile_apps')}</h3>
                <p className="text-text-muted">{t('about.mobile_apps_desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl text-primary font-bold">03</div>
              <div>
                <h3 className="text-xl font-bold text-text-main mb-2">{t('about.hosting')}</h3>
                <p className="text-text-muted">{t('about.hosting_desc')}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-text-main mb-8">{t('about.title')}</h2>
            <p className="text-text-muted leading-relaxed mb-8">
              {t('about.description')}
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-text-main mb-1">120+</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">{t('about.stats.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text-main mb-1">95%</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">{t('about.stats.satisfaction')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-text-main mb-1">10+</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">{t('about.stats.experience')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 container mx-auto px-4 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-main mb-4">{t('skills.title')}</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-text-muted max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-text-main flex items-center">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </span>
              {t('skills.languages')}
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Python', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
                { name: 'Dart', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
                { name: 'TypeScript', color: 'bg-blue-600/10 text-blue-600 border-blue-600/20' },
                { name: 'JavaScript', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
                { name: 'C++', color: 'bg-indigo-600/10 text-indigo-600 border-indigo-600/20' },
                { name: 'HTML5', color: 'bg-orange-600/10 text-orange-600 border-orange-600/20' },
                { name: 'CSS3', color: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className={`px-5 py-3 rounded-xl border ${skill.color} font-semibold text-lg transition-all shadow-sm hover:shadow-lg cursor-default shadow-black/5`}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-text-main flex items-center">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </span>
              {t('skills.frameworks')}
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Flutter', color: 'bg-cyan-400/10 text-cyan-500 border-cyan-400/20' },
                { name: 'Next.js', color: 'bg-white/10 text-text-main border-white/20' },
                { name: 'React', color: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
                { name: 'NestJS', color: 'bg-red-600/10 text-red-600 border-red-600/20' },
                { name: 'Django', color: 'bg-green-700/10 text-green-700 border-green-700/20' },
                { name: 'Tailwind CSS', color: 'bg-teal-400/10 text-teal-500 border-teal-400/20' },
                { name: 'Node.js', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
                { name: 'Git', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
                { name: 'Supabase', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  className={`px-5 py-3 rounded-xl border ${skill.color} font-semibold text-lg transition-all shadow-sm hover:shadow-lg cursor-default shadow-black/5`}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 container mx-auto px-4 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-text-main mb-4">{t('projects.title')}</h2>
            <div className="w-20 h-1 bg-primary"></div>
          </div>
          <p className="text-text-muted max-w-md">
            {t('projects.subtitle')}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} title={p.title} description={p.description} href={p.link} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-card-bg py-24 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-text-main mb-6">{t('contact.title')}</h2>
          <p className="text-text-muted mb-12 text-lg">
            {t('contact.subtitle')}
          </p>
          <div className="bg-background p-8 md:p-12 rounded-2xl border border-text-muted/10 shadow-2xl">
            <form className="grid gap-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-main">{t('contact.name')}</label>
                  <input type="text" className="w-full bg-card-bg border border-text-muted/20 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors" placeholder={t('contact.name_placeholder')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-main">{t('contact.email')}</label>
                  <input type="email" className="w-full bg-card-bg border border-text-muted/20 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors" placeholder={t('contact.email_placeholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main">{t('contact.message')}</label>
                <textarea className="w-full bg-card-bg border border-text-muted/20 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors h-32" placeholder={t('contact.message_placeholder')}></textarea>
              </div>
              <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  }
}

