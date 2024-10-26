import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorState {
  projects: Project[];
  currentProject: Project | null;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  setCurrentProject: (project: Project | null) => void;
}

interface Project {
  id: string;
  title: string;
  template: string;
  scenes: Scene[];
  lastEdited: Date;
}

interface Scene {
  id: string;
  duration: number;
  elements: Element[];
}

interface Element {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio';
  content: string;
  position: { x: number; y: number };
  style?: Record<string, any>;
}

export const useStore = create<EditorState>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      updateProject: (project) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === project.id ? project : p
          ),
        })),
      setCurrentProject: (project) =>
        set(() => ({
          currentProject: project,
        })),
    }),
    {
      name: 'video-editor-storage',
    }
  )
);