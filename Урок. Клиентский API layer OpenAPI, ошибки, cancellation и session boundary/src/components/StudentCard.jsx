import Badge from './Badge.jsx';
import SkillsList from './SkillsList.jsx';

function StudentCard({ student }) {
  const { name, age, course, city, gpa, skills } = student;

  function renderStars(rating) {
    const fullStars = Math.round(rating);
    return '⭐'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
  }

  const courseColor = course >= 3 ? '#28a745' : '#ffc107';
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=64`;

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={avatarUrl} alt={name} width={48} height={48} style={{ borderRadius: '50%' }} />
          <h3 style={{ margin: 0, fontSize: '18px' }}>{name}</h3>
        </div>
        <Badge text={`${course} курс`} color={courseColor} textColor="white" rounded={20} />
      </div>

      {/* Условный рендер: отличник */}
      {gpa >= 4.5 && (
        <div style={{ marginBottom: 8 }}>
          <Badge text="🏆 Отличник" color="#fef3c7" textColor="#92400e" rounded={20} />
        </div>
      )}

      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Возраст:</strong> {age} лет
      </p>
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Город:</strong> {city}
      </p>
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Средний балл:</strong> {gpa} {renderStars(gpa)}
      </p>

      <SkillsList skills={skills} />
    </div>
  );
}

export default StudentCard;
