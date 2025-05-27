export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'DELETE'; id: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'EDIT'; id: string; text: string };