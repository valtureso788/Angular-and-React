


#  Часть 1: Введение, окружение, JSX

## 1.1 Что такое React и зачем он нужен

**React** — это JavaScript-библиотека для построения пользовательских интерфейсов. Создана в Facebook (Meta) в 2013 году.

### Проблема, которую решает React

До React (в «ванильном» JS) ты писал так:

```js
// Чистый JS — нужно вручную находить элементы и менять их
const counterEl = document.getElementById('counter');
let count = 0;

document.getElementById('btn').addEventListener('click', () => {
  count++;
  counterEl.textContent = count; // вручную обновляем DOM
});
```

Проблемы:
- Легко забыть обновить какой-то элемент → UI рассинхронизируется с данными
- Много кода для простых вещей
- Сложно переиспользовать

### Как решает React

Ты описываешь **что должно быть на экране** в зависимости от данных, а React сам обновляет DOM:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

Ты меняешь **данные** (`count`) → React сам перерисовывает **интерфейс**. Это называется **декларативный подход**.

### Virtual DOM — как это работает под капотом

1. React держит в памяти **лёгкую копию** реального DOM (Virtual DOM)
2. При изменении данных создаётся **новое** дерево Virtual DOM
3. React **сравнивает** (diffing) старое и новое дерево
4. Находит минимальные различия и применяет их к **реальному** DOM

Это быстрее, чем перерисовывать весь DOM целиком.

> **Важно:** Virtual DOM — не «серебряная пуля». React не всегда быстрее чистого JS. Его сила — в **предсказуемости** и **удобстве** разработки.

---

## 1.2 Установка окружения через Vite

**Vite** (читается «вит», франц. «быстро») — современный сборщик. Он заменяет старый `create-react-app`.

### Почему Vite, а не CRA
- Запуск dev-сервера за ~300 мс вместо ~10 сек
- Мгновенный Hot Module Replacement (HMR) — изменения видны без перезагрузки
- `create-react-app` официально устарел (deprecated с 2023)

### Команды

```bash
# 1. Создаём проект (выбираем React + JavaScript)
npm create vite@latest my-app -- --template react

# 2. Переходим в папку
cd my-app

# 3. Устанавливаем зависимости
npm install

# 4. Запускаем dev-сервер
npm run dev
```

Открой `http://localhost:5173` — увидишь стартовую страницу.

### Структура проекта

```
my-app/
├── node_modules/         # зависимости (не трогаем, не коммитим)
├── public/               # статические файлы (favicon, картинки)
├── src/                  # ВЕСЬ твой код здесь
│   ├── assets/           # картинки, которые импортируются в код
│   ├── App.jsx           # корневой компонент
│   ├── App.css           # стили App
│   ├── main.jsx          # точка входа
│   └── index.css         # глобальные стили
├── index.html            # единственный HTML-файл
├── package.json          # список зависимостей и скриптов
└── vite.config.js        # конфиг Vite
```

### Разбор `main.jsx` — точки входа

```jsx
// main.jsx
import React from 'react'                          // сам React
import ReactDOM from 'react-dom/client'            // библиотека для рендера в браузер
import App from './App.jsx'                        // наш корневой компонент
import './index.css'                               // глобальные стили

// ReactDOM.createRoot находит <div id="root"> в index.html
// и делает его "корнем" React-приложения
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode — режим разработки, который:
  // 1. Предупреждает о плохих практиках
  // 2. Намеренно вызывает некоторые функции ДВАЖДЫ, чтобы поймать баги
  // В продакшене он ничего не делает
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### Разбор `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <!-- Единственный div, в который React будет рендерить ВСЁ приложение -->
    <div id="root"></div>
    <!-- Vite подключает main.jsx как модуль -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

> **Ключевая идея:** в React SPA (Single Page Application) у тебя **один HTML-файл**. Всё остальное — JavaScript, который генерирует HTML.

---

## 1.3 JSX — синтаксис

**JSX** = JavaScript XML. Это расширение синтаксиса JS, которое позволяет писать HTML-подобный код внутри JS.

```jsx
const element = <h1>Привет, мир!</h1>;
```

**Важно:** браузер не понимает JSX. Vite (через Babel/esbuild) **транслирует** его в обычные вызовы функций:

```js
// То, во что превращается JSX выше:
const element = React.createElement('h1', null, 'Привет, мир!');
```

### Правила JSX

**1. Один корневой элемент** (или Fragment)

```jsx
// ❌ Ошибка — два элемента на верхнем уровне
return (
  <h1>Заголовок</h1>
  <p>Текст</p>
);

// ✅ Обернуть в div
return (
  <div>
    <h1>Заголовок</h1>
    <p>Текст</p>
  </div>
);

// ✅ Или во Fragment (не создаёт лишний DOM-узел)
return (
  <>
    <h1>Заголовок</h1>
    <p>Текст</p>
  </>
);
```

**2. Все теги должны быть закрыты**

```jsx
// ❌
<img src="photo.jpg">
<br>
<input type="text">

// ✅
<img src="photo.jpg" />
<br />
<input type="text" />
```

**3. Атрибуты в camelCase**

```jsx
// ❌ HTML-стиль
<div class="box" onclick="handleClick()" tabindex="1">

// ✅ JSX-стиль
<div className="box" onClick={handleClick} tabIndex={1}>
```

Частые замены:
| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `tabindex` | `tabIndex` |
| `style="color: red"` | `style={{ color: 'red' }}` |

**4. Вставка JS-выражений через `{}`**

```jsx
const name = 'Иван';
const age = 25;

return (
  <div>
    <h1>Привет, {name}!</h1>
    <p>Тебе {age} лет</p>
    <p>Через год будет {age + 1}</p>
    <p>Имя в верхнем регистре: {name.toUpperCase()}</p>
    <p>2 + 2 = {2 + 2}</p>
  </div>
);
```

**Что можно класть в `{}`:**
- Переменные, выражения, вызовы функций
- Тернарники: `{isLoggedIn ? 'Выйти' : 'Войти'}`
- Массивы элементов

**Что НЕЛЬЗЯ:**
- Инструкции (`if`, `for`, `while`)
- Объявления переменных

```jsx
// ❌ Не работает
{ if (x > 0) { return 'positive' } }

// ✅ Используй тернарник или вынеси логику выше
{ x > 0 ? 'positive' : 'negative' }
```

**5. Инлайн-стили — объект**

```jsx
// Двойные фигурные скобки: первая — «вставка JS», вторая — «объект»
<div style={{ color: 'red', fontSize: '20px', marginTop: 10 }}>
  Текст
</div>
```

CSS-свойства тоже в camelCase: `font-size` → `fontSize`, `background-color` → `backgroundColor`.
Числовые значения — в `px` по умолчанию (`marginTop: 10` = `10px`).

**6. Комментарии**

```jsx
{/* Это JSX-комментарий, он не попадёт в DOM */}
<div>
  {/* Комментарий внутри JSX */}
  Текст
</div>
```

---

## 1.4 Практика  1 

Создай файл `src/App.jsx` и замени его содержимое:

```jsx
// App.jsx — корневой компонент приложения

// Переменные, которые будем вставлять в JSX
const userName = 'Алексей';
const userAge = 28;
const isStudent = true;
const skills = ['JavaScript', 'HTML', 'CSS'];

function App() {
  // Функция App — это функциональный компонент.
  // Компонент ОБЯЗАН возвращать JSX (или null).
  // Имя компонента — с большой буквы!

  // Переменные можно объявлять и внутри компонента
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - userAge;

  return (
    // Fragment <>...</> — чтобы не создавать лишний div
    <>
      {/* 1. Вставка переменных через {} */}
      <h1>Привет, {userName}!</h1>

      {/* 2. Выражения */}
      <p>Тебе {userAge} лет. Ты родился в {birthYear} году.</p>

      {/* 3. Тернарный оператор */}
      <p>Статус: {isStudent ? 'Студент' : 'Работает'}</p>

      {/* 4. Инлайн-стили — обрати внимание на двойные {} */}
      <p style={{ color: 'blue', fontWeight: 'bold' }}>
        Это синий жирный текст
      </p>

      {/* 5. className вместо class */}
      <div className="card">
        <h2>Навыки:</h2>
        {/* 6. Рендер массива — об этом в другой части, пока просто посмотри */}
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Экспорт по умолчанию — чтобы main.jsx мог импортировать
export default App;
```

Добавь в `src/index.css` немного стилей:

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}
```

**✅ Чек-лист часть 1:**
- [ ] Понимаю, зачем нужен React и что такое Virtual DOM
- [ ] Установил проект через Vite, он запускается
- [ ] Знаю структуру проекта и роль `main.jsx`
- [ ] Понимаю, что такое JSX и во что он компилируется
- [ ] Знаю 6 правил JSX (один корень, закрытие тегов, className, {}, стили, комментарии)
- [ ] Могу вставить переменную, выражение и тернарник в JSX

---

#  Часть 2: Компоненты и пропсы

## 2.1 Что такое компонент

**Компонент** — это функция, которая возвращает JSX. Это строительный блок React-приложения.

```jsx
function Welcome() {
  return <h1>Привет!</h1>;
}
```

### Правила компонентов
1. **Имя с большой буквы** — `Welcome`, а не `welcome`. React отличает компоненты от HTML-тегов именно по регистру: `<welcome />` — это HTML-тег, `<Welcome />` — компонент.
2. **Возвращает JSX** (или `null`, если ничего не нужно рендерить)
3. **Чистая функция** — при одинаковых входных данных возвращает одинаковый результат, не мутирует внешние переменные

### Зачем компоненты?
- **Переиспользование**: одна кнопка — много мест
- **Инкапсуляция**: логика и разметка вместе
- **Читаемость**: приложение = дерево компонентов
- **Тестируемость**: каждый компонент можно проверить отдельно

---

## 2.2 Создание и использование компонентов

Создай файл `src/components/Header.jsx`:

```jsx
// components/Header.jsx
function Header() {
  return (
    <>
    <header style={{ borderBottom: '2px solid #333', paddingBottom: 10 }}>
      <h1>Моё приложение</h1>
    </header>
    </>
  );
}

export default Header;
```

Используй его в `App.jsx`:

```jsx
// App.jsx
import Header from './components/Header';  // импорт без расширения .jsx
import './App.css';

function App() {
  return (
    <div>
      <Header />   {/* используем как HTML-тег, но с большой буквы */}
      <main>
        <p>Контент страницы</p>
      </main>
    </div>
  );
}

export default App;
```

### Два способа экспорта

```jsx
// 1. default export — один на файл
export default Header;
import Header from './Header';        // имя можно любое

// 2. named export — сколько угодно на файл
export function Header() { ... }
export function Footer() { ... }
import { Header, Footer } from './components';
```

**Правило:** компоненты — обычно `default export`, утилиты/хуки — `named export`.

---

## 2.3 Пропсы — передача данных в компонент

**Пропсы** (props = properties) — это входные параметры компонента. Аналог аргументов функции.

### Как передавать

```jsx
// Родитель передаёт данные как атрибуты
<User name="Иван" age={25} isAdmin={true} />
```

```jsx
// Ребёнок получает их первым аргументом
function User(props) {
  // props = { name: "Иван", age: 25, isAdmin: true }
  return (
    <div>
      <p>{props.name}, {props.age} лет</p>
    </div>
  );
}
```

### Деструктуризация — стандартный способ

```jsx
// Вместо props.name — сразу вытаскиваем нужные поля
function User({ name, age, isAdmin }) {
  return (
    <div>
      <p>{name}, {age} лет</p>
      {isAdmin && <span>👑 Админ</span>}
    </div>
  );
}
```

### Типы значений в пропсах

```jsx
<StringProp text="привет" />              {/* строка — кавычки */}
<NumberProp count={42} />                 {/* число — {} */}
<BoolProp isActive={true} />              {/* boolean — {} */}
<BoolProp isActive />                     {/* сокращение = {true} */}
<ArrayProp items={['a', 'b']} />          {/* массив */}
<ObjectProp user={{ name: 'Иван' }} />    {/* объект — двойные {} */}
<FuncProp onClick={() => console.log()} /> {/* функция */}
```

### Значения по умолчанию

```jsx
function Button({ text = 'Кнопка', color = 'blue' }) {
  // Если text не передан — будет 'Кнопка'
  return <button style={{ color }}>{text}</button>;
}

// Использование
<Button />                    // "Кнопка", синий
<Button text="Отправить" />   // "Отправить", синий
```

### `children` — особый пропс

Всё, что ты кладёшь **между** открывающим и закрывающим тегами, попадает в пропс `children`.

```jsx
function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8 }}>
      {children}
    </div>
  );
}

// Использование — содержимое внутри Card станет children
<Card>
  <h2>Заголовок</h2>
  <p>Текст внутри карточки</p>
</Card>
```

Это **мощнейший паттерн композиции**. `children` может быть:
- JSX-элементом
- строкой
- массивом элементов
- функцией (render props — продвинутый паттерн)

---

## 2.4 Ключевые принципы пропсов

###  Пропсы — только для чтения (read-only)

```jsx
// ❌ НИКОГДА так не делай
function User(props) {
  props.name = 'Другое имя'; // ошибка! нельзя мутировать пропсы
  return <p>{props.name}</p>;
}
```

**Однонаправленный поток данных:** данные текут сверху вниз (от родителя к ребёнку). Если ребёнку нужно изменить данные родителя — родитель передаёт **функцию-колбэк**.

```jsx
// Родитель
function App() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount(count + 1)} />;
}

// Ребёнок
function Child({ count, onIncrement }) {
  return (
    <div>
      <p>{count}</p>
      <button onClick={onIncrement}>+1</button>
    </div>
  );
}
```

> **useState мы разберём в часте 3**, но идею колбэков важно понять уже сейчас: ребёнок не меняет данные сам — он просит родителя это сделать.

### Композиция — вместо наследования

React не использует наследование компонентов. Вместо этого — **композиция**:

```jsx
// ✅ Композиция через children
<Modal>
  <Form />
</Modal>

// ✅ Композиция через пропсы
<Layout header={<Header />} footer={<Footer />} />
```

---

## 2.5 Полный практический пример

Сделаем **приложение-каталог студентов**. Оно объединит всё из Дней 1–2.

### Финальная структура

```
src/
├── components/
│   ├── Header.jsx
│   ├── StudentCard.jsx
│   ├── StudentList.jsx
│   └── StatCard.jsx
├── data/
│   └── students.js
├── App.jsx
└── index.css
```

### Файл 1: `src/data/students.js` — данные

```js
// Массив объектов — «база данных» нашего приложения.
// В реальном проекте данные пришли бы с сервера.

export const students = [
  {
    id: 1,
    name: 'Анна Иванова',
    age: 20,
    course: 2,
    city: 'Москва',
    gpa: 4.8,
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: 2,
    name: 'Пётр Смирнов',
    age: 22,
    course: 4,
    city: 'Санкт-Петербург',
    gpa: 4.2,
    skills: ['Python', 'Django', 'SQL'],
  },
  {
    id: 3,
    name: 'Мария Козлова',
    age: 19,
    course: 1,
    city: 'Казань',
    gpa: 4.9,
    skills: ['HTML', 'CSS', 'Figma'],
  },
  {
    id: 4,
    name: 'Дмитрий Петров',
    age: 21,
    course: 3,
    city: 'Новосибирск',
    gpa: 3.8,
    skills: ['Java', 'Spring', 'Docker'],
  },
];
```

### Файл 2: `src/components/Header.jsx` — шапка

```jsx
// Header — простой презентационный компонент.
// Он НЕ получает пропсов, потому что вся информация захардкожена.

function Header() {
  return (
    <>
    <header
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 32px',
        borderRadius: '12px',
        marginBottom: '24px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '28px' }}>🎓 Каталог студентов</h1>
      <p style={{ margin: '8px 0 0', opacity: 0.9 }}>
        Учебный проект по React
      </p>
    </header>
    </>
  );
}

export default Header;
```

### Файл 3: `src/components/StatCard.jsx` — карточка статистики

```jsx
// Универсальная карточка для отображения одного показателя.
// Принимает три пропса:
//   - label: подпись (строка)
//   - value: значение (строка или число)
//   - color: цвет фона (строка), по умолчанию '#f0f0f0'

function StatCard({ label, value, color = '#f0f0f0' }) {
  return (
    <div
      style={{
        background: color,
        padding: '16px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        flex: 1, // растягивается, если внутри flex-контейнера
      }}
    >
      {/* value вставляем через {} */}
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#555', marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

export default StatCard;
```

### Файл 4: `src/components/StudentCard.jsx` — карточка студента

```jsx
// Это САМЫЙ важный компонент. Разберём его детально.

function StudentCard({ student }) {
  // Деструктурируем пропс student — получаем объект студента.
  // Внутри сразу деструктурируем поля этого объекта.
  const { name, age, course, city, gpa, skills } = student;

  // Функция для отображения «звёздочек» по GPA.
  // Возвращает строку из ⭐ и ☆.
  // Это обычная JS-логика — её удобно вынести ДО return.
  function renderStars(rating) {
    const fullStars = Math.round(rating);      // округляем 4.8 → 5
    const emptyStars = 5 - fullStars;          // сколько пустых
    return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }

  // Цвет бейджа курса — тернарник для выбора
  const courseColor = course >= 3 ? '#28a745' : '#ffc107';

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
      {/* Шапка карточки: имя и курс */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, fontSize: '18px' }}>{name}</h3>

        {/* Бейдж с курсом. Цвет берём из переменной выше */}
        <span
          style={{
            background: courseColor,
            color: 'white',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap', // чтобы текст не переносился
          }}
        >
          {course} курс
        </span>
      </div>

      {/* Основная информация. Каждая строка — отдельный <p> */}
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Возраст:</strong> {age} лет
      </p>
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Город:</strong> {city}
      </p>

      {/* GPA со звёздочками */}
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Средний балл:</strong> {gpa} {renderStars(gpa)}
      </p>

      {/* Список навыков. 
          skills.map(...) возвращает МАССИВ JSX-элементов.
          React умеет рендерить массивы.
          key — обязателен для каждого элемента списка (см. пояснение ниже). */}
      <div style={{ marginTop: 12 }}>
        <strong style={{ fontSize: '14px' }}>Навыки:</strong>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginTop: 6,
          }}
        >
          {skills.map((skill) => (
            <span
              key={skill} // key = сам навык, т.к. они уникальны в рамках одного студента
              style={{
                background: '#eef2ff',
                color: '#4338ca',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
```

####  Почему `key` так важен?

Когда React видит массив элементов, ему нужно понимать, **какой элемент какой**. `key` — это уникальный идентификатор, который помогает React:

1. **Правильно обновлять DOM** при изменении, добавлении, удалении элементов
2. **Не перерисовывать всё зря** — только изменившиеся элементы

```jsx
// ❌ Плохо: index как key (ломается при сортировке/удалении)
{skills.map((skill, index) => <li key={index}>{skill}</li>)}

// ✅ Хорошо: стабильный уникальный id
{skills.map((skill) => <li key={skill.id}>{skill.name}</li>)}
```

**Правило:** `key` должен быть **стабильным**, **уникальным** среди соседей и **не меняться** между рендерами. Обычно используют `id` из данных. `index` — только как крайняя мера, если список никогда не меняет порядок.

### Файл 5: `src/components/StudentList.jsx` — список студентов

```jsx
import StudentCard from './StudentCard';

// StudentList принимает массив студентов и рендерит их карточки.
// Используем метод .map() — он превращает массив данных в массив компонентов.

function StudentList({ students }) {
  // Обработка пустого массива — важная практика UX
  if (students.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
        Студентов пока нет 😔
      </p>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        // Адаптивная сетка: 1 колонка на мобильном, больше на широком экране.
        // auto-fill + minmax — мощный приём без медиа-запросов
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}
    >
      {students.map((student) => (
        // key = student.id — уникальный идентификатор из данных
        // student={student} — передаём весь объект в пропс
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentList;
```

### Файл 6: `src/App.jsx` — собираем всё вместе

```jsx
import Header from './components/Header';
import StatCard from './components/StatCard';
import StudentList from './components/StudentList';
import { students } from './data/students';

function App() {
  // ---- Вычисления для статистики ----
  // Это обычный JS, не связанный с React.

  // Количество студентов
  const totalStudents = students.length;

  // Средний GPA: сумма всех gpa / количество
  // .reduce() сворачивает массив в одно значение.
  // 0 — начальное значение аккумулятора.
  const avgGpa =
    students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;

  // Самый молодой студент: Math.min(...ages) находит минимальный возраст
  const youngestAge = Math.min(...students.map((s) => s.age));

  // Уникальные города через Set (Set убирает дубликаты)
  const uniqueCities = new Set(students.map((s) => s.city)).size;

  return (
    // Обёртка с максимальной шириной и центрированием
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {/* 1. Шапка — без пропсов */}
      <Header />

      {/* 2. Блок статистики — 4 одинаковых компонента с разными пропсами */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        {/* Передаём label, value, color как пропсы */}
        <StatCard
          label="Всего студентов"
          value={totalStudents}
          color="#e0f2fe"
        />
        <StatCard
          label="Средний балл"
          value={avgGpa.toFixed(2)}  // .toFixed(2) → "4.43"
          color="#dcfce7"
        />
        <StatCard
          label="Младший возраст"
          value={`${youngestAge} лет`}  // шаблонная строка
          color="#fef3c7"
        />
        <StatCard
          label="Городов"
          value={uniqueCities}
          color="#fce7f3"
        />
      </div>

      {/* 3. Заголовок раздела */}
      <h2 style={{ marginBottom: 16 }}>Список студентов</h2>

      {/* 4. Список карточек — передаём весь массив */}
      <StudentList students={students} />
    </div>
  );
}

export default App;
```

### Файл 7: `src/index.css` — глобальные стили

```css
/* Сброс базовых стилей и общая типографика */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
  background: #f8fafc;
  color: #1e293b;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  margin-top: 0;
}
```

---

## 🔍 Разбор потока данных в примере

Проследим путь данных сверху вниз:

```
App.jsx
  │
  │ передаёт students={students}
  ▼
StudentList
  │
  │ в .map() для каждого элемента
  │ передаёт student={student}
  ▼
StudentCard
  │
  │ деструктурирует { name, age, gpa, skills, ... }
  ▼
рендерит разметку
```

**Ключевые принципы, которые ты применил:**
1. **Однонаправленный поток** — данные идут только сверху вниз
2. **Композиция** — `App` собирает маленькие компоненты
3. **Разделение ответственности** — `StudentCard` отвечает только за отображение одного студента
4. **Переиспользование** — `StatCard` используется 4 раза с разными пропсами
5. **Деструктуризация** — код читается чище
6. **key** — правильно задан через `id` и через `skill`

---

## Упражнения для закрепления

Попробуй сам, не подглядывая:

### Уровень 1 (базовый)
1. **Компонент `Footer`** — футер с копирайтом. Подключи его в `App`.
2. **Компонент `Badge`** — принимает `text` и `color`, рендерит цветной бейдж. Используй его в `StudentCard` вместо инлайн-стилей.
3. **Условный рендер в карточке**: если `gpa >= 4.5` — показывай значок «🏆 Отличник».

### Уровень 2 (средний)
4. **`StatCard` с иконкой**: добавь пропс `icon`, отображай его перед значением.
5. **`StudentCard` с аватаром**: сгенерируй аватар через `https://ui-avatars.com/api/?name=${name}` и покажи его в карточке.
6. **Отдельный компонент `SkillsList`**: вынеси блок навыков из `StudentCard` в отдельный компонент, который принимает массив `skills`.

### Уровень 3 (продвинутый)
7. **`StudentList` с сортировкой**: принимай пропс `sortBy` (`'name'`