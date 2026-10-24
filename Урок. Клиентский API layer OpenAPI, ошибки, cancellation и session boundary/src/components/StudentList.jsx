import StudentCard from './StudentCard.jsx';

// sortBy: '' | 'name' | 'age' | 'gpa'
function StudentList({ students, sortBy = '' }) {
  if (students.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
        Студентов пока нет 😔
      </p>
    );
  }

  // Копия массива, чтобы не мутировать пропс
  const sorted = [...students];
  if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  else if (sortBy === 'age') sorted.sort((a, b) => a.age - b.age);
  else if (sortBy === 'gpa') sorted.sort((a, b) => b.gpa - a.gpa);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}
    >
      {sorted.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentList;
