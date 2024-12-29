import React from "react";
import { useEdit } from "../context/TodoContext";

function TestComponent(){
    const {editingId, todoAll, isLoading, latestAllTodo} = useEdit();

    React.useEffect(()=>{
        latestAllTodo();
    }, []);

    return(
        <div>
            <p data-testid="editingId">{editingId}</p>
            <p data-testid="isLoading">{isLoading ? "true":"false"}</p>
            <ul>
                {todoAll.map((todo)=>(
                    <li key={todo.id} data-testid={`todo-${todo.id}`}>
                        {todo.memo}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestComponent;