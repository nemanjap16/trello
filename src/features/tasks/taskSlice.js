import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  lists: [
    {
      id: `list-${uuidv4()}`,
      title: 'To Do',
      tasks: [
        {
          id: `card-${uuidv4()}`,
          name: 'Create a task',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          id: `card-${uuidv4()}`,
          name: 'Create a list',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        }
      ]
    },
    {
      id: `list-${uuidv4()}`,
      title: 'Doing',
      tasks: [
        {
          id: `card-${uuidv4()}`,
          name: 'Create your first task',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          id: `card-${uuidv4()}`,
          name: 'Set up the project',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    },
    {
      id: `list-${uuidv4()}`,
      title: 'Done',
      tasks: []
    }
  ]
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,

  reducers: {
    reset: (state) => (state = initialState),
    createTask: (state, { payload }) => {
      const newTask = {
        id: `card-${uuidv4()}`,
        name: payload.title,
        text: payload.task
      };
      state.lists.map((list) => {
        if (list.id === payload.id) {
          list.tasks.push(newTask);
        }
        return;
      });
    },
    createList: (state, { payload }) => {
      const newList = {
        id: `list-${uuidv4()}`,
        title: payload,
        tasks: []
      };
      // state.cards.push(newList);
      return {
        lists: [...state.lists, newList]
      };
    },
    deleteList: (state, { payload }) => {
      if (payload.listId) {
        state.lists.map((list) => {
          state.lists = state.lists.filter((list) => list.id !== payload.listId);
          return {
            lists: [...state.lists, list]
          };
        });
      }
      return;
    },
    deleteTask: (state, { payload }) => {
      state.lists.map((list) => {
        if (list.id === payload.listId) {
          list.tasks = list.tasks.filter((task) => task.id !== payload.taskId);
          return {
            lists: [...state.lists, list]
          };
        }
      });
      return;
    },
    editTask: (state, { payload }) => {
      state.lists.map((list) => {
        if (list.id === payload.listId) {
          list.tasks.map((task) => {
            if (task.id === payload.cardId) {
              task.name = payload.cardTitle;
              task.text = payload.cardText;
            }
            return;
          });
          return {
            lists: [...state.lists, list]
          };
        }
      });
      return;
    },
    dragAndDrop: (state, { payload }) => {
      const { destination, source, draggableId } = payload;

      if (!destination) return;

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      // checking is it in a same list
      if (destination.droppableId === source.droppableId) {
        const list = state.lists.find((list) => list.id === destination.droppableId);
        const newTaskOrder = Array.from(list.tasks);
        newTaskOrder.splice(source.index, 1);
        newTaskOrder.splice(
          destination.index,
          0,
          state.lists.find((list) => list.id === source.droppableId).tasks[source.index]
        );
        list.tasks = newTaskOrder;
      } else {
        const startList = state.lists.find((list) => list.id === source.droppableId);
        const finishList = state.lists.find((list) => list.id === destination.droppableId);
        const newTaskOrder = Array.from(startList.tasks);
        newTaskOrder.splice(source.index, 1);
        const newTask = {
          id: `card-${uuidv4()}`,
          name: startList.tasks[source.index].name,
          text: startList.tasks[source.index].text
        };
        finishList.tasks.splice(destination.index, 0, newTask);
        startList.tasks = newTaskOrder;
      }
    }
  }
});

export const { reset, createTask, deleteTask, editTask, createList, deleteList, dragAndDrop } =
  taskSlice.actions;
export default taskSlice.reducer;
