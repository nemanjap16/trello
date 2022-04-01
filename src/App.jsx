import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { dragAndDrop } from './features/tasks/taskSlice';
// components
import TrelloList from './components/TrelloList/TrelloList.jsx';
import AddButton from './components/AddButton/AddButton.jsx';
import Header from './components/Header/Header.jsx';

const App = () => {
  const lists = useSelector((state) => state.tasker.lists);
  const dispatch = useDispatch();

  const handleOnDragEnd = (result) => {
    dispatch(dragAndDrop(result));
  };

  return (
    <div>
      <Header />
      <DragDropContext onDragEnd={(results) => handleOnDragEnd(results)}>
        <main>
          {lists.map((list, index) => (
            <TrelloList key={list.id} list={list} index={index} listId={list.id} />
          ))}
          <AddButton />
        </main>
      </DragDropContext>
    </div>
  );
};

export default App;
