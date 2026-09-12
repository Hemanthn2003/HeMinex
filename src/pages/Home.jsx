import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import Services from "../components/services/Services";
import Projects from "../components/projects/Projects";
import Process from "../components/process/Process";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import FloatingContacts from "../components/contact/FloatingContacts";
import useLenis from "../hooks/useLenis";

export default function Home() {
  useLenis();

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>

      <Footer />

      <FloatingContacts />
    </>
  );
}
