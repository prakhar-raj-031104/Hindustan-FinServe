import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import Showcase from '../sections/Showcase';
import SideScroll from '../sections/SideScroll';
import StackCards from '../sections/StackCards';
import WhyUs from '../sections/WhyUs';
import Rates from '../sections/Rates';
import Calculator from '../sections/Calculator';
import Process from '../sections/Process';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
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
    </>
  );
}
