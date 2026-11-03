
import { useEffect, useState } from 'react'
import '../App.css'

const STORAGE_KEY = 'brew-bloom-wellness-v1'
const WATER_GOAL = 8

function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function loadSavedDay() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')

    if (saved?.date === getToday()) {
      return {
        date: getToday(),
        water: Math.max(0, Math.min(WATER_GOAL, Number(saved.water) || 0)),
      }
    }
  } catch {
    // Start fresh if saved data is unavailable.
  }

  return { date: getToday(), water: 0 }
}

export default function Wellness({ onBack }) {
  const [day, setDay] = useState(loadSavedDay)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(day))
    } catch {
      // Continue working if browser storage is unavailable.
    }
  }, [day])

  useEffect(() => {
    const checkDay = () => {
      setDay(current =>
        current.date === getToday()
          ? current
          : { date: getToday(), water: 0 }
      )
    }

    window.addEventListener('focus', checkDay)
    const timer = window.setInterval(checkDay, 60000)

    return () => {
      window.removeEventListener('focus', checkDay)
      window.clearInterval(timer)
    }
  }, [])

  function updateWater(amount) {
    setDay(current => ({
      ...current,
      water: Math.max(0, Math.min(WATER_GOAL, current.water + amount)),
    }))
  }

  const progress = Math.min((day.water / WATER_GOAL) * 100, 100)

  return (
    <div className="wellness-page">
      <header className="cafe-header">
        <a className="brand" href="#wellness-top">
          <span className="brand-flower">✿</span>
          <span>Brew &amp; Bloom</span>
        </a>

        <span className="header-caption">
          YOUR LITTLE CORNER OF CALM
        </span>

        <button
          type="button"
          className="wellness-home-button"
          onClick={onBack}
        >
          ← Back to brewing
        </button>
      </header>

      <main className="wellness-content" id="wellness-top">
        <div className="step-line">
          <span>01 / PAUSE</span>
          <span>02 / HYDRATE</span>
          <span>03 / BLOOM</span>
        </div>

        <section className="wellness-heading">
          <div>
            <div className="eyebrow">
              ✳ YOUR DAILY REMINDER
            </div>

            <h1>
              A Healthy Mind <em>in a Healthy Body.</em>
            </h1>

            <p>
              Make sure to take care of yourself, and not just your grades. Make sure to stay hydrated throughout the day.
            </p>
          </div>

          <span className="heading-sparkle" aria-hidden="true">
            ✿
          </span>
        </section>

        <section className="wellness-widget">
          <div className="wellness-widget-top">
            <span className="wellness-widget-icon">💧</span>

            <div>
              <div className="eyebrow">DRINK WELL</div>
              <h2>Hydration Tracker</h2>
            </div>

            <span className="wellness-counter">
              TODAY
            </span>
          </div>

          <div className="wellness-panel">
            <p className="wellness-prompt">
              Each cup matters .
            </p>

            <div className="wellness-progress-label">
              <span>Today's hydration fill</span>
              <strong>
                {day.water} / {WATER_GOAL} glasses
              </strong>
            </div>

            <div
              className="wellness-progress"
              role="progressbar"
              aria-label="Hydration progress"
              aria-valuemin={0}
              aria-valuemax={WATER_GOAL}
              aria-valuenow={day.water}
            >
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="water-cups">
              {Array.from({ length: WATER_GOAL }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`water-cup ${
                    index < day.water ? 'is-filled' : ''
                  }`}
                  onClick={() => setDay(current => ({
                    ...current,
                    water: index + 1,
                  }))}
                  aria-label={`Log ${index + 1} glasses of water`}
                  aria-pressed={index < day.water}
                >
                  💧
                </button>
              ))}
            </div>

            <div className="wellness-actions">
              <button
                type="button"
                className="wellness-secondary"
                onClick={() => updateWater(-1)}
                disabled={day.water === 0}
              >
                − Remove one
              </button>

              <button
                type="button"
                className="primary"
                onClick={() => updateWater(1)}
                disabled={day.water >= WATER_GOAL}
              >
                + Log a glass
              </button>
            </div>

            <p className="wellness-small-note">
              Everyone has different hydration needs.
              This is just a guide to getting the recommended 8 cups a day.
            </p>
          </div>

          <div className="wellness-widget-footer">
            <span className="wellness-save-note">
              ✿ Should keep track for the day.
            </span>
          </div>
        </section>

        <div className="wellness-footer">
          <span>✿ One step closer to becoming your best self.</span>
          <span>Bloom into your dream self.</span>
        </div>
      </main>
    </div>
  )
}