import type { Project } from '../types';

const labels: Record<Project, string> = { personal: 'Личное', work: 'Работа', study: 'Учёба' };
export default function ProjectSelector({ value, onChange }: { value: Project; onChange: (value: Project) => void }) {
  return (
    <label>Проект
      <select value={value} onChange={(event) => onChange(event.target.value as Project)}>
        {Object.entries(labels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select>
    </label>
  );
}
