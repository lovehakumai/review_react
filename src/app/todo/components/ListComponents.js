"use server";

import { AllTodoLists } from "@/app/actions/todoAction";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ListItem from "./ListItem";

export default async function ListComponent(){
    const todoList = await AllTodoLists();
    return(
        <>
            {todoList.map((todo)=>(
                <div className="border-2 mb-10" key={todo.id}>
                    <div className="flex flex-row justify-between mb-2 mt-5">
                        <div className="flex flex-column items-start ">
                            <ListItem todo={todo}/>
                            <p className="font-bold text-xl ml-10">{todo.memo}</p>
                        </div>
                        <div className="flex flex-row space-x-2 > * mr-5 font-bold">
                            <IconButton aria-label="edit" size="small" color="primary"><Edit /></IconButton>
                            <IconButton aria-label="delete" size="small" color="error"><Delete /></IconButton>
                        </div>
                    </div>
                    <ul className="text-xs text-right">
                        <li>create: {todo.createDate.toLocaleDateString()} - {todo.createDate.toLocaleTimeString()}</li>
                        <li>lastmodified: {todo.lastModified.toLocaleDateString()} - {todo.lastModified.toLocaleTimeString()}</li>
                    </ul>
                </div>
            ))}
        </>
    );
}

