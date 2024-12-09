"use client";

import { IconButton, Checkbox } from "@mui/material"; // Material-UIのコンポーネント
import { CheckBoxOutlineBlank } from "@mui/icons-material"; // Material-UIのアイコン
import { deleteTodo, handleCheckTodo } from "@/app/actions/todoAction";
import { Delete, Edit } from "@mui/icons-material";
import { useEdit } from "../context/TodoContext";

export function CheckButton({todo}){
    const {latestAllTodo} = useEdit();

    const handleClick=()=>{
        handleCheckTodo(todo.id, todo.status);
        latestAllTodo();
    }
    return(
        <>
            <IconButton 
                aria-label={todo.status===true ? "check-on":"check-off"} 
                size="small" 
                color="disabled" 
                type="submit"
                onClick={handleClick}
            >
                {todo.status==="true"?<Checkbox />:<CheckBoxOutlineBlank />}
            </IconButton>            
        </>
    );
}

export function EditButton({todo}){
    const {toggleEditMode} = useEdit();
    return(
        <>
            <IconButton 
                aria-label="edit" 
                size="small" 
                color="primary"
                onClick = {()=>toggleEditMode(todo.id)}
            >
                <Edit />
            </IconButton>
        </>
    );
}

export function DeleteButton({todo}){
    const {latestAllTodo} = useEdit();
    const handleClick = () =>{
        deleteTodo(todo);
        latestAllTodo();
    }
    return(
        <>
            <IconButton 
                aria-label="delete" 
                size="small" 
                color="error"
                onClick = {()=>handleClick()}
            >
                <Delete />
            </IconButton>
        </>
    );
}