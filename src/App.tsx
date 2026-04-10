import { ReactLenis } from '@studio-freight/react-lenis';
import Navigation from './components/Navigation';
import { CurtainTransition } from './components/CurtainTransition';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div style={{ backgroundColor: '#000', position: 'relative' }}>
        <div className="vignette" aria-hidden />
        <Navigation />
        <main>
          <Hero />

          <CurtainTransition id="about">
            <About />
          </CurtainTransition>

          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
