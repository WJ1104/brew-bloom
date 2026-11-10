// Focus time card selections

import { FOCUS_OPTIONS } from '../data/focusOptions'

export default function FocusTime({ drink, minutes, onChange, onNext, onBack }) {
  const picked = FOCUS_OPTIONS.find((option) => option.minutes === minutes)

  return (
    <div className="cafe-page">
      <main className="picker">
        <div className="picker-heading">
          <div>
            <span className="eyebrow">✳ STEP TWO · SET YOUR FOCUS</span>
            <h1>
              How long will you <em>bloom</em>?
            </h1>
            <p>Your {drink.name.toLowerCase()} will brew for this long.</p>
          </div>
          <span className="heading-sparkle">✳</span>
        </div>

        <div className="drink-grid time-grid">
          {FOCUS_OPTIONS.map((option) => {
            const isSelected = option.minutes === minutes
            return (
              <button
                key={option.minutes}
                className={isSelected ? 'drink-card time-card is-selected' : 'drink-card time-card'}
                onClick={() => onChange(option.minutes)}
              >
                <div className="card-top">
                  <span className="card-tag">{option.label.toUpperCase()}</span>
                  <span className="selection-dot">{isSelected ? '✓' : ''}</span>
                </div>
                <div className="card-content">
                  <h2>{option.minutes}</h2>
                  <p>minutes of focus</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="order-summary">
          <div className="order-left">
            <span className="order-icon">✿</span>
            <div>
              <span className="order-label">YOUR PICK</span>
              <strong>
                {drink.name}{' '}
                <span className="order-note">· {picked ? picked.label : 'choose a time'}</span>
              </strong>
            </div>
          </div>
          <div className="time-actions">
            <button className="back-button" onClick={onBack}>
              ← Back
            </button>
            <button className="order-button" onClick={onNext} disabled={!picked}>
              Start brewing <span>→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}