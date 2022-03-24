import { useState } from 'react';
import styles from './style.module.css';

export const AddToDo = ({ completeAll, addItem }) => {
  const [inputValue, setInputValue] = useState('');
  const [wasCompleted, setWasCompleted] = useState(false)

  const toggleComplete = () => {
    completeAll(!wasCompleted);
    setWasCompleted(!wasCompleted)
  }

  return (
    <div className={styles.whatToDo}>
      <button className={styles.completeAll} onClick={toggleComplete}>⌄</button>
      <input
        value={inputValue}
        type="text"
        placeholder="What needs to be done?"
        className={styles.input}
        onChange={({ target }) => {
          setInputValue(target.value);
        }}
        onKeyDown={({ key }) => {
          if (key === 'Enter') {
            addItem(inputValue);
            setInputValue('');
          }
        }}
      />
    </div>
  );
};
