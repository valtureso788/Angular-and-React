export default function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return <div className="empty-state"><h2>{title}</h2>{hint && <p>{hint}</p>}</div>;
}
