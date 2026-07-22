import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Hero3D } from "./components/Hero3D";
import { Carousel3D } from "./components/Carousel3D";
import { Mark3D } from "./components/Mark3D";
import { CtaBand, Footer, Marquee, Nav, Process, Results, Services } from "./components/Sections";
import { Reveal } from "./components/Reveal";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
    <LoadingScreen ready={heroReady} onEnter={() => setEntered(true)} />
    <div id="top">
      <Nav />
      <Hero3D entered={entered} onReady={() => setHeroReady(true)} />
      <Marquee />

      <section className="carousel-sec" id="portfolio">
        <div className="glowmesh" />
        <Reveal>
          <div className="sec-head">
            <div>
              <span className="eyebrow">The network</span>
              <h2>
                Twenty-five brands. <em>One</em> growth machine.
              </h2>
            </div>
            <p>
              The full network we manage or have access to — with eight brands under active,
              hands-on management right now. The distribution engine behind everything we ship.
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
