import Badge from './Badge.jsx';

// Список навыков студента
function SkillsList({ skills }) {
  return (
    <div style={{ marginTop: 12 }}>
      <strong style={{ fontSize: '14px' }}>Навыки:</strong>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 6 }}>
        {skills.map((skill) => (
          <Badge key={skill} text={skill} />
        ))}
      </div>
    </div>
  );
}

export default SkillsList;
