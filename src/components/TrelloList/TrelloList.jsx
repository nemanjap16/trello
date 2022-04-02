import React from 'react';
import AddButton from '../AddButton/AddButton.jsx';
import TrelloCard from '../TrelloCard/TrelloCard.jsx';
import { Droppable } from 'react-beautiful-dnd';
import { deleteList } from '../../features/tasks/taskSlice';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import './TrelloList.scss';

const TrelloList = ({ list, listId }) => {
  const dispatch = useDispatch();

  const deleteListHandler = (listId) => {
    dispatch(deleteList({ listId: listId }));
  };

  return (
    <Droppable droppableId={String(list.id)}>
      {(provided) => (
        <div className="list" {...provided.droppableProps} ref={provided.innerRef}>
          <div className="list__header">
            <h4>{list.title}</h4>
            <MdDelete className="list__delete-btn" onClick={() => deleteListHandler(list.id)} />
          </div>

          <div className="list__body">
            <div className="list__card">
              <AddButton title={'card'} id={list.id} />
            </div>
            {list.tasks.map((task, i) => (
              <TrelloCard key={task.id} task={task} index={i} listId={listId} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TrelloList;
