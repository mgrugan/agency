/**
 * Statue hero copy layer. The sculpture / disc themselves live in the
 * fixed <ClayScroll> layer behind the content, because the sculpture is
 * the scroll actor for the whole page — it can't be trapped in the hero.
 */
export function StatueHero() {
  return (
    <header className="shero">
      <div className="shero-content">
        <span className="eyebrow">Our approach</span>
        <h1>AMPLIFY</h1>
        <p>
          We turn classical patience into modern momentum — engineering audiences that reach 128
          million people a month, and make brands impossible to ignore.
        </p>
        <a className="shero-cta" href="#portfolio">
          <span className="ring" aria-hidden="true">
            →
          </span>
          <span>See the network</span>
        </a>
      </div>

      <div className="shero-index">
        <span className="cur">01</span>
        <span className="bar">
          <i />
        </span>
        <span className="tot">03</span>
      </div>
    </header>
  );
}
