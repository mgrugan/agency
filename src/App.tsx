import { Hero } from "./components/Hero";
import { Carousel3D } from "./components/Carousel3D";
import { Mark3D } from "./components/Mark3D";
import { CtaBand, Footer, Nav, Process, Results, Services } from "./components/Sections";
import { Reveal } from "./components/Reveal";

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />

      <section className="carousel-sec" id="portfolio">
        <Reveal>
          <div className="sec-head">
            <div>
              <div className="label-caps">The network</div>
              <h2 style={{ marginTop: 12 }}>Twenty-four brands. One growth machine.</h2>
            </div>
            <p>
              Every account below is owned and operated by Algo Media — a living laboratory for
              what works on social, refreshed daily.
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
