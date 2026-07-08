import { MotionConfig } from "framer-motion";
import { Hero3D } from "./components/Hero3D";
import { Carousel3D } from "./components/Carousel3D";
import { Mark3D } from "./components/Mark3D";
import { CtaBand, Footer, Marquee, Nav, Process, Results, Services } from "./components/Sections";
import { Reveal } from "./components/Reveal";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div id="top">
      <Nav />
      <Hero3D />
      <Marquee />

      <section className="carousel-sec" id="portfolio">
        <div className="glowmesh" />
        <Reveal>
          <div className="sec-head">
            <div>
              <span className="eyebrow">The network</span>
              <h2>
                Twenty-four brands. <em>One</em> growth machine.
              </h2>
            </div>
            <p>
              Every account here is owned and operated by Telos Media — a living laboratory for what
              works on social. Drag to explore.
            </p>
          </div>
        </Reveal>
        <Carousel3D />
      </section>

      <Services />
      <Results />
      <Mark3D />
      <Process />
      <CtaBand />
      <Footer />
    </div>
    </MotionConfig>
  );
}
