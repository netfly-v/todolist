import { useState } from 'react';
import { AddToDo } from '../AddToDo';
import { ToDo } from '../ToDo';
import styles from './style.module.css';
import { v4 as uuid } from 'uuid';
import { storage } from '../../utils/localstorage';

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

const TODOS_STORAGE = 'TODOS_STORAGE';

export const Todolist = () => {
  const [items, setItems] = useState(storage.has(TODOS_STORAGE) ? storage.get(TODOS_STORAGE) : []);
  const [type, setType] = useState(TYPE.ALL);

  const updateItems = updatedItems => {
    setItems(updatedItems);
    storage.set(TODOS_STORAGE, updatedItems);
  };

  const clearAllItems = () => {
    setItems([]);
    storage.delete(TODOS_STORAGE);
  };

  const addItem = value => {
    updateItems([...items, generateItem(value)]);
  };

  const deleteItem = deleteId => {
    updateItems(items.filter(item => item.id !== deleteId));
  };

  const toggleCompleted = (isChecked, toggleId) => {
    updateItems(items.map(item => (item.id === toggleId ? { ...item, isCompleted: isChecked } : item)));
  };

  const completeAll = (isCompleted) => {
    updateItems(items.map(item => ({ ...item, isCompleted})))
  }

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
        <AddToDo addItem={addItem} generateItem={generateItem} completeAll={completeAll}/>
        {items.length ? (
          <div className={styles.todo}>
            <ul className={styles.list}>{renderToDosByType()}</ul>
            <footer className={styles.footer}>
              <div>{items.length} items left</div>
              <div className={styles.links}>
                <button onClick={() => setType(TYPE.ALL)} className={styles.selected}>
                  All
                </button>
                <button className={styles.toggleItems} onClick={() => setType(TYPE.ACTIVE)}>Active</button>
                <button className={styles.toggleItems} onClick={() => setType(TYPE.COMPLETED)}>Completed</button>
              </div>
              {items.some(item => item.isCompleted === true) ? (<button
                onClick={() => updateItems(items.filter(item => !item.isCompleted))}
                className={styles.clearCompleted}
              >
                Clear completed
              </button>) : null}
              <button onClick={clearAllItems} className={styles.clearCompleted}>
                Clear all
              </button>
            </footer>
          </div>
        ) : null}
      </div>
    </div>
  );
};
