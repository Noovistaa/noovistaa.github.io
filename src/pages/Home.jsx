// The home page. Each line below is one section. Reorder or delete lines to change the page.
// The text for each section lives in src/content/home.js.
import Page from '../components/layout/Page'
import Hero from '../components/sections/Hero'
import Partners from '../components/sections/Partners'
import Intro from '../components/sections/Intro'
import Mission from '../components/sections/Mission'
import Stats from '../components/sections/Stats'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <Page>
      <Hero />
      <Partners />
      <Intro />
      <Mission />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
    </Page>
  )
}
