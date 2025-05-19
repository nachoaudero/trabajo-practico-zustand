import { useEffect, useState } from "react";
import { useTareas } from "../../../hooks/useTareas";
import { tareaStore } from "../../../store/tareaStore";
import type { ITarea } from "../../../types/iTarea";
import { CardList } from "../CardList/CardList";
import { Modal } from "../Modal/Modal";
import styles from "./ListTareas.module.css";

export const ListTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const { getTareas, tareas } = useTareas();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (tarea: ITarea) => {
    setOpenModal(true);
    setTareaActiva(tarea);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h2>Lista de tareas</h2>
          <button
            className="add"
            onClick={() => setOpenModal(true)}
          >
            Agregar tarea
          </button>
        </div>
        <div className={styles.tareasContainer}>
          {tareas.length > 0 ? (
            tareas.map((tarea) => (
              <CardList
                key={tarea.id}
                open={handleOpenModal}
                tarea={tarea}
              />
            ))
          ) : (
            <div>
              <h3>No hay tareas!!</h3>
            </div>
          )}
        </div>
      </div>
      {openModal && <Modal close={handleCloseModal} />}
    </>
  );
};
