// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import StatCard from './components/StatCard.jsx';
import StudentList from './components/StudentList.jsx';
import { students } from './data/students.js';

function App() {
  // Calculate statistics
  const totalStudents = students.length;
  const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
  const youngestAge = Math.min(...students.map((s) => s.age));
  const uniqueCities = new Set(students.map((s) => s.city)).size;

  // Optional sorting state (can be extended)
  const [sortBy, setSortBy] = useState(''); // '' | 'name' | 'age' etc.

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {/* Header */}
      <Header />

      {/* Statistics cards */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <StatCard label="Всего студентов" value={totalStudents} color="#e0f2fe" icon="👥" />
        <StatCard label="Средний балл" value={avgGpa.toFixed(2)} color="#dcfce7" icon="⭐" />
        <StatCard label="Младший возраст" value={`${youngestAge} лет`} color="#fef3c7" icon="🧒" />
        <StatCard label="Городов" value={uniqueCities} color="#fce7f3" icon="🌆" />
      </div>

      {/* Section title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Список студентов</h2>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="name">По имени</option>
          <option value="age">По возрасту</option>
          <option value="gpa">По баллу</option>
        </select>
      </div>

      {/* Student list */}
      <StudentList students={students} sortBy={sortBy} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
