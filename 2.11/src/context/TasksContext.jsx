import { createContext, useEffect, useReducer } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
const STORAGE_KEY = 'context-tasks-v1';

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'TOGGLE':
      return state.map((task) => task.id === action.payload ? { ...task, done: !task.done } : task);
    case 'DELETE':
      return state.filter((task) => task.id !== action.payload);
    case 'HYDRATE':
      return action.payload;
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

function readTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(parsed)) throw new TypeError('Сохранённые задачи должны быть массивом');
    return parsed;
  } catch (error) {
    console.warn('Не удалось прочитать задачи, используется пустой список', error);
    return [];
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, readTasks);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn('Не удалось сохранить задачи', error);
    }
  }, [tasks]);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
