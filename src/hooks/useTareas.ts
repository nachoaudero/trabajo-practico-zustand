import Swal from "sweetalert2";
import { useShallow } from "zustand/shallow";
import { getAllTareas, postTarea, putTarea } from "../http/tareas";
import { tareaStore } from "../store/tareaStore";
import type { ITarea } from "../types/iTarea";

export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    setNuevaTarea,
    setEliminarTarea,
    setTareaEditada,
  } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      setNuevaTarea: state.setNuevaTarea,
      setEliminarTarea: state.setEliminarTarea,
      setTareaEditada: state.setTareaEditada,
    }))
  );

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) setArrayTareas(data);
  };

  const createTarea = async (nuevaTarea: ITarea) => {
    setNuevaTarea(nuevaTarea);

    try {
      await postTarea(nuevaTarea);

      Swal.fire("Exito.", "Tarea creada correctamente.", "success");
    } catch (error) {
      setEliminarTarea(nuevaTarea.id!);

      console.log(error);
    }
  };

  const editTarea = async (tareaEditada: ITarea) => {
    const estadoPrev = tareas.find((tarea) => tarea.id === tareaEditada.id);

    setTareaEditada(tareaEditada);

    try {
      await putTarea(tareaEditada);

      Swal.fire("Exito.", "Tarea actualizada correctamente.", "success");
    } catch (error) {
      if (estadoPrev) setTareaEditada(estadoPrev);

      console.log(error);
    }
  };

  const deleteTarea = async (id: string) => {
    const estadoPrev = tareas.find((tarea) => tarea.id === id);

    const confirm = await Swal.fire({
      title: "Estas seguro de eliminar la tarea?",
      text: "Esta accion no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar.",
      cancelButtonText: "Cancelar.",
    });

    if (!confirm.isConfirmed) return;

    setEliminarTarea(id);
    try {
      await deleteTarea(id);

      Swal.fire("Eliminado.", "Tarea eliminada correctamente.", "success");
    } catch (error) {
      if (estadoPrev) setTareaEditada(estadoPrev);

      console.log(error);
    }
  };

  return { tareas, getTareas, createTarea, editTarea, deleteTarea };
};
