
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import AboutPlayer from './components/sections/AboutPlayer';
import SkillsLoadout from './components/sections/SkillsLoadout';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Reviews from './components/sections/Reviews';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  return (
    <Layout>
      <Navbar />
      <Hero />

      {/* Unified Green Container for Main Content */}
      <div className="bg-[#064e3b] rounded-[3rem] mt-12 mb-20 relative z-10 pt-16 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        {/* Scroll Indicator positioned just above the green card */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-retro-dark/50 animate-bounce">Scroll</span>
        </div>

        <AboutPlayer />
        <SkillsLoadout />
      </div>

      <Projects />
      <Experience />
      <Reviews />
      <Contact />
      <Footer />

    </Layout>
  );
}

export default App;
