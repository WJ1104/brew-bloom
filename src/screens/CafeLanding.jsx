import './CafeLanding.css'

function Storefront({ onEnter }) {
  return (
    <div className="bb-store-scene" aria-label="Illustration of the Brew and Bloom café storefront">
      <div className="bb-sun" />
      <div className="bb-cloud bb-cloud-one" /><div className="bb-cloud bb-cloud-two" />
      <div className="bb-building">
        <div className="bb-roof" />
        <div className="bb-shop-sign">✿ Brew &amp; Bloom <small>YOUR LITTLE STUDY CAFÉ</small></div>
        <div className="bb-awning">{Array.from({length: 6}, (_, i) => <span key={i} />)}</div>
        <div className="bb-window bb-window-left" />
        <div className="bb-window bb-window-right" />
        <button type="button" className="bb-shop-door" onClick={onEnter} aria-label="Enter the café through the door"><span>✦</span><span>ENTER</span></button>
      </div>
      <div className="bb-path"/>
    </div>
  )
}

export default function CafeLanding({onEnter}) {
  return (
    <div className="bb-landing">
      <header className="bb-landing-header">
        <div className="bb-landing-brand"><span>✿</span> Brew &amp; Bloom</div>
        <span className="bb-landing-header-note">a little space to grow, one focus session at a time</span>
        <span className="bb-landing-header-right">✦ YOUR STUDY CAFÉ</span>
      </header>
      <main className="bb-landing-main">
        <section className="bb-landing-copy">
          <div className="bb-landing-eyebrow">✦ THE DOOR IS OPEN</div>
          <h1>Your favorite<br/><em>little escape.</em></h1>
          <p>A warm drink, a quiet corner, and a little time just for you. Come in and make yourself at home.</p>
          <button type="button" className="bb-enter-button" onClick={onEnter}>Enter the café <span aria-hidden="true">↗</span></button>
        </section>
        <div className="bb-scene-wrap">
          <Storefront onEnter={onEnter}/>
          <div className="bb-scene-tag">✦ CLICK THE CAFÉ DOOR TO ENTER</div>
        </div>
      </main>
      <footer className="bb-landing-footer"><span>✿ BREW SLOWLY. BLOOM BRIGHTLY.</span><span>MADE FOR LITTLE MOMENTS OF FOCUS</span></footer>
    </div>
  )
}
