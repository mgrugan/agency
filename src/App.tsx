import { Hero } from "./components/Hero";
import { Carousel3D } from "./components/Carousel3D";
import { Mark3D } from "./components/Mark3D";
import { NetworkBg } from "./components/NetworkBg";
import { CtaBand, Footer, Marquee, Nav, Process, Results, Services } from "./components/Sections";
import { Reveal } from "./components/Reveal";

export default function App() {
  return (
    <div id="top">
      <NetworkBg />
      <Nav />
      <Hero />
      <Marquee />

      <section className="carousel-sec" id="portfolio">
        <Reveal>
          <div className="sec-head">
            <div>
              <div className="label-caps">The network</div>
              <h2 style={{ marginTop: 14 }}>
                Twenty-four brands. <em>One</em> growth machine.
              </h2>
            </div>
            <p>
              Every account below is owned and operated by Algo Media — a living laboratory for what
              works on social, refreshed daily. Drag to explore.
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
  );
}
