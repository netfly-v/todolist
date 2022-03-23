import { useState } from 'react';
import { AddToDo } from '../AddToDo';
import { ToDo } from '../ToDo';
import styles from './style.module.css';
import { v4 as uuid } from 'uuid';

const generateItem = (name, isCompleted = false) => ({
  name,
  isCompleted,
  id: uuid(),
});

const TYPE = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
};

export const Todolist = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState(TYPE.ALL);

  const addItem = value => {
    setItems([...items, generateItem(value)]);
  };

  const deleteItem = deleteId => {
    setItems(items.filter(item => item.id !== deleteId));
  };

  const toggleCompleted = (isChecked, toggleId) => {
    setItems(items.map(item => (item.id === toggleId ? { ...item, isCompleted: isChecked } : item)));
  };

  const renderToDos = itemsByType =>
    itemsByType.map(item => (
      <li className={styles.item} key={item.id}>
        <ToDo item={item} deleteItem={deleteItem} toggleCompleted={toggleCompleted} />
      </li>
    ));

  const renderToDosByType = () => {
    switch (type) {
      case TYPE.ALL:
        return renderToDos(items);
      case TYPE.ACTIVE:
        return renderToDos(items.filter(item => !item.isCompleted));
      case TYPE.COMPLETED:
        return renderToDos(items.filter(item => item.isCompleted));
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.text}>todos</header>
      <div className={styles.content}>
        <AddToDo addItem={addItem} />
        <div className={styles.todo}>
          <ul className={styles.list}>{renderToDosByType()}</ul>
          <footer className={styles.footer}>
            <div>{items.length} items left</div>
            <div className={styles.links}>
              <button onClick={() => setType(TYPE.ALL)} className={styles.selected}>
                All
              </button>
              <button onClick={() => setType(TYPE.ACTIVE)}>Active</button>
              <button onClick={() => setType(TYPE.COMPLETED)}>Completed</button>
            </div>
            <button className={styles.clearCompleted}>Clear completed</button>
          </footer>
        </div>
      </div>
    </div>
  );
};
