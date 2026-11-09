/*
Prints the reciept of the session, including:
Drink name,
Focus time in minutes,
Caffeine content in mg,
Date and time of the session
*/

export default function Receipt({ drink, focusSeconds, finishedAt, onAgain }) {
  const duration = focusSeconds < 60 ? `${focusSeconds} sec` : `${Math.round(focusSeconds / 60)} min`
  const when = finishedAt.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <main>
      <article className="receipt">
        <h2>Brew &amp; Bloom</h2>
        <p>Session receipt</p>

        <dl>
          <div className="receipt-row">
            <dt>Drink</dt>
            <dd>{drink.name}</dd>
          </div>
          <div className="receipt-row">
            <dt>Focus time</dt>
            <dd>{duration}</dd>
          </div>
          <div className="receipt-row">
            <dt>Caffeine</dt>
            <dd>{drink.caffeine ? `${drink.caffeine} mg` : 'none'}</dd>
          </div>
          <div className="receipt-row">
            <dt>Date</dt>
            <dd>{when}</dd>
          </div>
        </dl>

        <p>Thanks for focusing.</p>
      </article>

      <button className="primary" onClick={onAgain}>
        Brew another
      </button>
    </main>
  )
}