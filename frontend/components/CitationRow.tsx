import type { Citation } from "../lib/mock";

export default function CitationRow({ citations }: { citations: Citation[] }) {
  if (!citations.length) {
    return <p>No grounded passages yet. The PolicyAgent cites source file plus score, or states the answer is not in policy.</p>;
  }
  return (
    <div>
      {citations.map((c) => (
        <article className="cite" key={`${c.source}-${c.score}`}>
          <p>{c.text}</p>
          <p className="src mono">
            Source: {c.source} · Score: {c.score.toFixed(2)}
          </p>
        </article>
      ))}
    </div>
  );
}
