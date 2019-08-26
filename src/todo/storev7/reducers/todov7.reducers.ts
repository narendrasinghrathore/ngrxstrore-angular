import { ITodoList } from 'src/models/list.interface';

import * as FromTodoActions from '../actions/todov7.actions';

export interface TodoState {
  entites: { [id: number]: ITodoList };
  loaded: boolean;
  loading: boolean;
}

export const initialStateTodo: TodoState = {
  entites: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialStateTodo,
  action: FromTodoActions.TodoActions
): TodoState {
  switch (action.type) {
    case FromTodoActions.LOAD_TODOS: {
      return {
        ...state,
        loading: true
      };
    }
    case FromTodoActions.LOAD_TODOS_SUCCESS: {
      const list = action.payload;
      const entites = list.reduce(
        (en: { [id: number]: ITodoList }, todo: ITodoList) => {
          return {
            ...en,
            [todo.id]: todo,
          };
        }, {
          ...state.entites
        }
      );

      return {
        ...state,
        loaded: true,
        loading: false,
        entites
      };
    }
    case FromTodoActions.LOAD_TODOS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }

  return state;
}
