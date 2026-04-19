import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Testimonials from "../components/Testimonials/Testimonials";
// import CTA from "../components/CTA";
import Footer from "../components/Footer/Footer";

export default function Home() {

  return (
    <>
      <Navbar />
      <section id="inicio">
        <Hero />
      </section>

      <section id="Características">
        <Features />
      </section>

      <section id="¿Cómo funciona?">
        <HowItWorks />
      </section>

      <section id="Testimonios">
        <Testimonials />
      </section>

      <Footer />
    </>
  );
}