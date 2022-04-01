import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import { MdDelete, MdEdit } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../../features/tasks/taskSlice';
import './TrelloCard.scss';

const TrelloCard = ({ task, index, listId }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(true);
  const [title, setTitle] = useState(task.name);
  const [taskText, setTaskText] = useState(task.text);

  const handleDelete = (id) => {
    dispatch(deleteTask({ listId: listId, taskId: id }));
  };

  const handleEdit = () => {
    setEdit(!edit);
    dispatch(editTask({ listId: listId, cardId: task.id, cardTitle: title, cardText: taskText }));
  };

  const editView = () => {
    return (
      <div className="task-form">
        <input
          className="task-title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          className="task-description"
          name="task"
          id="task"
          cols="10"
          minRows="4"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}></TextareaAutosize>
        <div className="btn-wrapper">
          <button className="task-btn" onClick={() => handleEdit()}>
            {'Edit'}
          </button>
          <MdClose
            className="task-btn_close"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => onKeyPressHandler(e)}
            onClick={() => setEdit(!edit)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {edit ? (
        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
          {(provided) => (
            <div
              className="card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <div className="task-name">
                <h4>{task.name}</h4>
              </div>
              <div>
                <p className="card__text">{task.text}</p>
              </div>
              <div className="card__icons">
                <div className="card__buttons" onClick={() => handleDelete(task.id)}>
                  <MdDelete className="card__delete-btn" />
                  <p>delete</p>
                </div>
                <div className="card__buttons" onClick={() => handleEdit(task.id)}>
                  <MdEdit className="card__edit-btn" />
                  <p>edit</p>
                </div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      ) : (
        <div>{editView()}</div>
      )}
    </>
  );
};

export default TrelloCard;
