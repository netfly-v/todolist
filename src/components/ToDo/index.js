import { useEffect, useState } from 'react';
import styles from './style.module.css';

export const ToDo = ({ item, deleteItem, toggleCompleted }) => {
  const [checked, setChecked] = useState(item.isCompleted);

  useEffect(() => {
    setChecked(item.isCompleted)
  }, [item.isCompleted])

  return (
    <div className={styles.todoWrapper}>
      <input
        className={styles.toggle}
        type="checkbox"
        checked={checked}
        onChange={({ target }) => {
          setChecked(target.checked);
          toggleCompleted(target.checked, item.id);
        }}
      />
      <span>{item.name}</span>
      <button className={styles.close} onClick={() => deleteItem(item.id)}>
        x
      </button>
    </div>
  );
};
