import { useTareas } from "../../../hooks/useTareas";
import type { ITarea } from "../../../types/iTarea";
import styles from "./CardList.module.css";

type ICardList = {
  open: (tarea: ITarea) => void;
  tarea: ITarea;
};

export const CardList = ({ open, tarea }: ICardList) => {
  const { eliminarTarea } = useTareas();

  const handleDelete = () => {
    eliminarTarea(tarea.id!);
  };

  const handleEdit = () => {
    open(tarea);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.contentContainer}>
        <h3>Titulo: {tarea.titulo}</h3>
        <p>Descripcion: {tarea.descripcion}</p>
        <p>
          Fecha Limite: <b>{tarea.fechaLimite}</b>
        </p>
      </div>
      <div className={styles.actionsContainer}>
        <button
          onClick={handleDelete}
          className="delete"
        >
          Eliminar
        </button>
        <button
          onClick={handleEdit}
          className="edit"
        >
          Editar
        </button>
      </div>
    </div>
  );
};
