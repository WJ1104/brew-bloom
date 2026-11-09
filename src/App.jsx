
import { useState } from 'react'
import './App.css'
import { DRINKS } from './data/drinks'
import Brewing from './screens/Brewing'
import Receipt from './screens/Receipt'
import CafeLanding from './screens/CafeLanding'
import FocusTime from './screens/FocusTime'
import Wellness from './screens/Wellness'

const drinkDetails = {
  latte: { emoji: '☕', tag: 'ESPRESSO BAR', ingredients: 'Oat milk · espresso · vanilla', mood: 'A cozy pick-me-up', description: 'Silky, creamy, a familiar favorite', focus: 5, breakMinutes: 5 },
  matcha: { emoji: '🍵', tag: 'MOST LOVED', ingredients: 'Matcha · oat milk · vanilla', mood: 'Calm, steady energy', description: 'Green, creamy, quietly energizing', focus: 5, breakMinutes: 5 },
  hibiscus: { emoji: '🌺', tag: 'CAFFEINE FREE', ingredients: 'Hibiscus · citrus · ice', mood: 'A refreshing reset', description: 'Floral, bright, a refreshing reset', focus: 5, breakMinutes: 5 },
}

function App() {
  const [screen, setScreen] = useState('landing')
  const [selectedId, setSelectedId] = useState(DRINKS[1]?.id ?? DRINKS[0].id)
  const [focusSeconds, setFocusSeconds] = useState(0)
  const [finishedAt, setFinishedAt] = useState(null)
  const [minutes, setMinutes] = useState(20)
  const drink = DRINKS.find((d) => d.id === selectedId) ?? DRINKS[0]

  if (screen === 'landing') {
    return <CafeLanding onEnter={() => setScreen('pick')} />
  }
  if (screen === 'wellness') {
    return <Wellness onBack={() => setScreen('pick')} />
  }
  if (screen === 'receipt') {
    return (
      <Receipt
        drink={drink}
        focusSeconds={focusSeconds}
        finishedAt={finishedAt}
        onAgain={() => setScreen('pick')}
      />
    )
  }

  // Focus time page
  if (screen === 'focus') {
    return (
      <FocusTime
        drink={drink}
        minutes={minutes}
        onChange={setMinutes}
        onNext={() => setScreen('brew')}
        onBack={() => setScreen('pick')}
      />
    )
  }

  // Brewing page
  if (screen === 'brew') {
    return (
      <Brewing
        drink={drink}
        minutes={minutes}
        onBack={() => setScreen('pick')}
        onFinish={(seconds) => {
          setFocusSeconds(seconds)
          setFinishedAt(new Date())
          setScreen('receipt')
        }}
      />
    )
  }

  // Main drink selection page
  return (
    <div className="cafe-page">
      <header className="cafe-header">
        <button type="button" className="brand brand-home" onClick={() => setScreen('landing')} aria-label="Back to café entrance"><span className="brand-flower">✿</span><span>Brew &amp; Bloom</span></button>
        <span className="header-caption">YOUR LITTLE CORNER OF CALM</span>
        <button type="button" className="header-pill wellness-entry" onClick={() => setScreen('wellness')}>✿ Your wellness</button>
      </header>

      <main className="picker" id="top">
        <div className="step-line"><span>01 / CHOOSE</span><span>02 / BREW</span><span>03 / FOCUS</span><span>04 / BLOOM</span></div>
        <div className="picker-heading"><div><div className="eyebrow">✳ STEP ONE · CHOOSE YOUR ORDER</div><h1>What are we <em>brewing?</em></h1><p>Pick the drink that matches your energy. Your little moment of focus starts here. Choose a drink to keep you company.</p></div><span className="heading-sparkle" aria-hidden="true">✳</span></div>
        <div className="drink-grid" role="group" aria-label="Choose your drink">
          {DRINKS.map((d) => {
            const info = drinkDetails[d.id] ?? {
              emoji: '☕',
              tag: 'FRESHLY BREWED',
              ingredients: d.note,
              mood: 'Made for your focus',
            }

            const selected = d.id === selectedId
            return <button key={d.id} type="button" className={`drink-card ${selected ? 'is-selected' : ''}`} onClick={() => setSelectedId(d.id)} aria-pressed={selected}>
              <div className="card-top"><span className="card-tag">{info.tag}</span><span className="selection-dot">{selected ? '✓' : ''}</span></div>
              <div className="drink-art" style={{ '--drink-color': d.color }}><span className="art-sparkle">✧</span><span className="drink-emoji" aria-hidden="true">{info.emoji}</span><span className="art-leaf">✿</span></div>
              <div className="card-content"><h2>{d.name}</h2><p>{info.description ?? d.note}</p><div className="card-divider"/><span className="ingredients">{info.ingredients}</span><div className="card-footer"><span>{d.caffeine === 0 ? '◌ caffeine free' : `☼ ${d.caffeine} mg caffeine`}</span><span>{info.mood}</span></div></div>
            </button>
          })}
        </div>

        <div className="order-summary">
          <div className="order-left">
            <span className="order-icon">✿</span>

            <div>
              <span className="order-label">
                YOUR PICK
              </span>

              <strong>
                {drink.name}{' '}
                <span className="order-note">
                  · {drinkDetails[drink.id]?.mood ??
                    'Ready to brew'}
                </span>
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="order-button"
            onClick={() => setScreen('focus')}
          >
            Let's brew <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="picker-footer">
          <span>
            ✿ a little ritual for a brighter day
          </span>

          <span>BREW SLOWLY. BLOOM DAILY.</span>
        </div>
      </main>
    </div>
  )
}

export default App
