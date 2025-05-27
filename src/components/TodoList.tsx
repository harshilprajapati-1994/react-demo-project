import { useState } from 'react';
import {Todo} from '../types';
import {ActionType} from '../types';


interface propsType {
    todos: Todo[],
    dispatch: React.Dispatch<ActionType>
}



const TodoList = (props: propsType) => {
    const [edittext, setedittext] = useState('');
    const [editid, setediteid] = useState('');

    const handleedit = (id: string, text: string) => {
        setedittext(text);
        setediteid(id)
    }

    const handlesave = (text: string, id: string) => {
        setediteid('');
        props.dispatch({type: 'EDIT', text: text, id: id})
    }

    return (
        <ul>
            {props.todos.map((items: Todo) => {
                return <li>
                    {items.id == editid ? (
                            <>
                                <input type='text' value={edittext} onChange={(e) => setedittext(e.target.value)} />
                                <button type="button" onClick={() => handlesave(edittext, editid)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span style={{textDecoration: items.completed ? 'line-through' : 'none'}}>{items.text}</span>
                                <button type='button' onClick={() => props.dispatch({type: 'TOGGLE', id: items.id})}>
                                    {items.completed ? 'Undo' : 'Done'}
                                </button>
                                <button type='button' onClick={() => props.dispatch({type: 'DELETE', id: items.id})} >Delete</button>
                                <button type='button' onClick={() => handleedit(items.id, items.text)}>Edit</button>
                            </>
                        )
                    }
                    
                </li>
            })}
        </ul>
    )
}

export default TodoList;