import Button from "../components/Button.jsx";
// Temporary page so navigation works end to end. Replace as each page is built.
export default function StubPage({
  title,
  note,
  nextLabel,
  onNext,
  onRestart,
  isLast,
}) {
  return (
    <section className="card">
      <h1 className="script">{title}</h1>
      <p className="caption">{note || "This page is coming next."}</p>
      <Button onClick={isLast ? onRestart : onNext}>
        {isLast ? "Start over" : nextLabel || "Continue"}
      </Button>
    </section>
  );
}
