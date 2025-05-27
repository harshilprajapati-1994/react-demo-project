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
                                <span style={{textDecoration: items.completed ? 'line-through' : 'none', display: 'inline-block', marginRight: '10px'}}>{items.text}</span>
                                <button type='button' onClick={() => props.dispatch({type: 'TOGGLE', id: items.id})}>
                                    {items.completed ? 'Undo' : 'Done'}
                                </button>
                                <button type='button' onClick={() => props.dispatch({type: 'DELETE', id: items.id})} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/>
                                    </svg>
                                </button>
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