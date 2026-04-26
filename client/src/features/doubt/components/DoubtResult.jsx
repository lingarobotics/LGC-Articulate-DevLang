// DoubtResult.jsx

export default function DoubtResult({ aiFeedback, userResponse }) {
  if (!aiFeedback || !aiFeedback.final) return null;

  const text = aiFeedback.final;

  // 🔥 SIMPLE SPLIT (WORKS WITH YOUR PROMPT)
  const parts = text.split(/What matters|How to think|Example response/i);

  const whatMatters = parts[1] || "";
  const howToThink = parts[2] || "";
  const example = parts[3] || "";

  return (
    <div className="doubt-result">

      <div className="doubt-section">
        <h3>What matters</h3>
        <p>{whatMatters.trim()}</p>
      </div>

      <div className="doubt-section">
        <h3>How to think</h3>
        <p>{howToThink.trim()}</p>
      </div>

      <div className="doubt-section">
        <h3>Example response</h3>
        <p>{example.trim()}</p>
      </div>

    </div>
  );
}