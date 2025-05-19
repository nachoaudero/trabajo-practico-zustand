import { create } from "zustand";
import type { ITarea } from "../types/iTarea";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setArrayTareas: (tareasArray: ITarea[]) => void;
  setNuevaTarea: (tarea: ITarea) => void;
  setTareaEditada: (tareaEditada: ITarea) => void;
  setEliminarTarea: (id: string) => void;
  setTareaActiva: (tarea: ITarea | null) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,

  // Agregar el array de tareas
  setArrayTareas: (tareas) => set(() => ({ tareas })),

  // Agregar una tarea nueva al array
  setNuevaTarea: (tarea) =>
    set((state) => ({ tareas: [...state.tareas, tarea] })),

  // Editar una tarea del array
  setTareaEditada: (tareaEditada) =>
    set((state) => {
      const tareasArray = state.tareas.map((tarea) =>
        tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
      );

      return { tareas: tareasArray };
    }),

  // Eliminar tarea del array
  setEliminarTarea: (id) =>
    set((state) => {
      const tareasArray = state.tareas.filter((tarea) => tarea.id !== id);

      return { tareas: tareasArray };
    }),

  // Setear tarea activa
  setTareaActiva: (tarea) => set(() => ({ tareaActiva: tarea })),
}));
