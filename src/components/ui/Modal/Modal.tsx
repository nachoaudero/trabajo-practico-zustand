import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useTareas } from "../../../hooks/useTareas";
import { tareaStore } from "../../../store/tareaStore";
import type { ITarea } from "../../../types/iTarea";
import styles from "./Modal.module.css";

type IModal = {
  close: () => void;
};

const initialState = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

export const Modal = ({ close }: IModal) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const [formValues, setFormValues] = useState<ITarea>(initialState);

  const { createTarea, editTarea } = useTareas();

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (tareaActiva) {
      editTarea(formValues);
    } else {
      createTarea({
        ...formValues,
        id: crypto.randomUUID(),
      });
    }

    setTareaActiva(null);
    close();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.popUp}>
        <div>
          <h3>{tareaActiva ? "Editar tarea" : "Crear tarea"}</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.inputsContainer}>
            <input
              type="text"
              required
              autoComplete="off"
              name="titulo"
              placeholder="Titulo..."
              value={formValues.titulo}
              onChange={handleChange}
            />
            <textarea
              required
              name="descripcion"
              placeholder="Descripcion..."
              value={formValues.descripcion}
              onChange={handleChange}
            />
            <input
              type="date"
              required
              autoComplete="off"
              name="fechaLimite"
              onChange={handleChange}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className="delete"
              onClick={close}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="add"
            >
              {tareaActiva ? "Editar tarea" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
