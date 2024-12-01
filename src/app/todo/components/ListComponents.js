"use client";

import { AllTodoLists } from "@/app/actions/todoAction";

export default function ListComponent(){
    const todoList = AllTodoLists();
    console.log("TODO List : ", todoList);

    return(
        <>
            {todoList.map((todo)=>(
                <>
                    <div key={todo.id}>
                        <p>Todo: {todo.memo}</p>
                        <p>ID: {todo.id}</p>
                    </div>
                </>
            ))};
        </>
    );
}