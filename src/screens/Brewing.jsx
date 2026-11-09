/* sets up the timer for the brewing screen */

import { useEffect, useState } from 'react'
import Cup from '../components/Cup'

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

export default function Brewing({ drink, minutes, onBack, onFinish }) {
  const totalSeconds = minutes * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [running, setRunning] = useState(false)
  const finished = secondsLeft === 0
  const progress = 1 - secondsLeft / totalSeconds

  useEffect(() => {
    if (!running || finished) return

    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [running, finished])

  return (
    <main>
      <h1>{drink.name}</h1>
      <Cup color={drink.color} progress={progress} />
      <p className="timer">{formatTime(secondsLeft)}</p>

      {finished ? (
        <button className="primary" onClick={() => onFinish(totalSeconds)}>
          Get my receipt
        </button>
      ) : (
        <button className="primary" onClick={() => setRunning(!running)}>
          {running ? 'Pause' : 'Start focus'}
        </button>
      )}

      <button onClick={onBack}>Back</button>
    </main>
  )
}