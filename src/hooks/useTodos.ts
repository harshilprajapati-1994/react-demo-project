import { Todo } from '../types'
import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

type actionType = 
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'EDIT'; id: string; text: string };

const reducerFunction = (currentState: Todo[], action: actionType): Todo[] => {
  switch(action.type) {
    case 'ADD': 
    return [...currentState, {id: uuidv4(), text: action.text, completed: false}]

    case 'TOGGLE':
    return currentState.map((items) => {
      return items.id == action.id ? {...items, completed: !items.completed} : items
    })

    case 'DELETE':
    return currentState.filter((items) => items.id != action.id);

    case 'EDIT':
    return currentState.map((items) => {
      return items.id == action.id ? {...items, text: action.text} : items
    })

    default:
      return currentState;

  }
}
export function useTodos() {
    const [todos, dispatch] = useReducer(reducerFunction, [], (() => {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : []
    }));

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return {todos, dispatch}
}