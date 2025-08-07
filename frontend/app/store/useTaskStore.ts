import { create } from 'zustand';
import { Task } from '../types/Task';

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>(set => ({
  tasks: [],
  setTasks: tasks => set({ tasks }),
  addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
  updateTask: updated =>
    set(state => ({
      tasks: state.tasks.map(t => (t.id === updated.id ? updated : t)),
    })),
  deleteTask: id =>
    set(state => ({
      tasks: state.tasks.filter(t => t.id !== id),
    })),
}));
