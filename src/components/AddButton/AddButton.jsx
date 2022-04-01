import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './AddButton.scss';
import { MdAdd, MdClose } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';
import { createTask, createList } from '../../features/tasks/taskSlice';

const AddButton = ({ title, id }) => {
  const buttonText = title == 'card' ? 'Add another card' : 'Add another list';
  const buttonWidth = title == 'card' ? '100%' : '276px';
  const buttonTextOpacity = title == 'card' ? 1 : 0.55;
  const buttonTextColor = title == 'card' ? 'black' : '#fff';
  const buttonTextBackground = title == 'card' ? 'rgba(0, 0, 0, 0.10)' : '#011836';

  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({ title: '', task: '' });
  const dispatch = useDispatch();

  const placeholder =
    title == 'card' ? 'Enter a title for this card...' : 'Enter a title for this list...';
  const btnTitle = title == 'card' ? 'Add card' : 'Add list';
  const input = useRef(null);
  const textarea = useRef(null);

  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const addList = () => {
    if (formState.title.length > 0) {
      dispatch(createList(formState.title));
      setFormState({ title: '', task: '' });
      setIsOpen(false);
    }
    input.current.classList.add('error-input');
    return;
  };

  const addTask = () => {
    if (formState.title.length > 0 && formState.task.length > 0) {
      dispatch(createTask({ id: id, title: formState.title, task: formState.task }));
      setFormState({ title: '', task: '' });
      setIsOpen(false);
    }
    if (formState.title.length === 0) {
      input.current.classList.add('error-input');
    } else {
      input.current.classList.remove('error-input');
    }
    if (formState.task.length === 0) {
      textarea.current.classList.add('error-input');
    } else {
      textarea.current.classList.remove('error-input');
    }
    return;
  };

  const formHandler = () => {
    setIsOpen(!isOpen);
    setFormState({ title: '', task: '' });
  };

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  const form = () => {
    if (btnTitle === 'Add list') {
      return (
        <div className="task-form">
          <input
            className="task-title"
            type="text"
            name="title"
            placeholder={placeholder}
            ref={input}
            autoFocus={true}
            onChange={(e) => onChange(e)}
          />
          <div className="btn-wrapper">
            <button className="task-btn" onClick={() => addList()}>
              {btnTitle}
            </button>
            <MdClose
              className="task-btn_close"
              role={'button'}
              tabIndex={0}
              onClick={() => formHandler()}
              onKeyDown={(e) => onKeyPressHandler(e)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="task-form">
          <input
            className="task-title"
            type="text"
            name="title"
            placeholder={placeholder}
            ref={input}
            onChange={(e) => onChange(e)}
          />
          <TextareaAutosize
            className="task-description"
            name="task"
            id="task"
            cols="10"
            minRows="4"
            placeholder="Enter a new task..."
            ref={textarea}
            onChange={(e) => onChange(e)}></TextareaAutosize>
          <div className="btn-wrapper">
            <button className="task-btn" onClick={() => addTask()}>
              {btnTitle}
            </button>
            <MdClose
              className="task-btn_close"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => onKeyPressHandler(e)}
              onClick={() => formHandler()}
            />
          </div>
        </div>
      );
    }
  };

  const button = () => {
    return (
      <div
        className="add-button"
        role="button"
        tabIndex={0}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
          borderRadius: 3,
          width: buttonWidth
        }}
        onKeyDown={() => setIsOpen(!isOpen)}
        onClick={() => setIsOpen(!isOpen)}>
        <MdAdd />
        <p>{buttonText}</p>
      </div>
    );
  };
  return <div className="render">{isOpen ? form() : button()}</div>;
};

export default AddButton;
