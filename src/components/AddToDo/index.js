import { useState } from 'react';
import styles from './style.css';

export const AddToDo = ({ addItem }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <input
      value={inputValue}
      type="text"
      placeholder="What needs to be done?"
      className="input"
      onChange={({ target }) => {
        setInputValue(target.value);
      }}
      onKeyDown={({ key, target }) => {
        if (key === 'Enter') {
          addItem(inputValue);
          setInputValue('');
        }
      }}
    />
  );
};
