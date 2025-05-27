import { useState } from "react";
import { ActionType } from '../types';

interface prostype {
    dispatch: React.Dispatch<ActionType>;
}

const Addtodo = (props: prostype) => {
    const [userinput, setuserinput] = useState('');
    
    const handleAdd = () => {
        if (!userinput.trim()) return;
        props.dispatch({ type: 'ADD', text: userinput.trim() });
        setuserinput('');
    };


    return (
        <>
            <div>
                <input type="text" value={userinput} onChange={(e) => setuserinput(e.target.value)} />
                <button type="button" onClick={handleAdd}>Button</button>
            </div>
        </>
    )
}

export default Addtodo;