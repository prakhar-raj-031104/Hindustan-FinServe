import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import SideScroll from './sections/SideScroll';
import Showcase from './sections/Showcase';
import StackCards from './sections/StackCards';
import WhyUs from './sections/WhyUs';
import Rates from './sections/Rates';
import Calculator from './sections/Calculator';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Showcase />
        <SideScroll />
        <StackCards />
        <WhyUs />
        <Rates />
        <Calculator />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
