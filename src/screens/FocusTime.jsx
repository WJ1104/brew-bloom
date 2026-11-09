// Focus time card selections

import { FOCUS_OPTIONS } from '../data/focusOptions'

export default function FocusTime({ drink, minutes, onChange, onNext, onBack }) {
  return (
    <main>
      <h1>How long do you want to focus?</h1>
      <p>Your {drink.name.toLowerCase()} will brew for this long.</p>

      <div className="drink-list">
        {FOCUS_OPTIONS.map((option) => (
          <button
            key={option.minutes}
            className={option.minutes === minutes ? 'card selected' : 'card'}
            onClick={() => onChange(option.minutes)}
          >
            <strong>{option.label}</strong>
          </button>
        ))}
      </div>

      <button className="primary" onClick={onNext}>
        Start brewing
      </button>
      <button onClick={onBack}>Back</button>
    </main>
  )
}