import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1>App de tareas con zustand</h1>
      </div>
    </header>
  );
};
