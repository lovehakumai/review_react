"use client";
import React from "react";
import { useState } from "react";
import { useEdit } from "../context/TodoContext";
import { TextField } from "@mui/material";
import { updateTodo } from "@/app/actions/todoAction";

export default function ListItemMemo({todo}){
    const {editingId, toggleEditMode} = useEdit();
    const [inputValue, setInputValue] = useState(todo.memo);

    const handleChange = (e) =>{
        setInputValue(e.target.value);
    }

    const handleBlur = (e) =>{
        const todoData = {
            id: todo.id,
            memo: e.target.value,
            lastModified: new Date()
        }
        updateTodo(todoData);
        toggleEditMode(todo.id);
    }
    return(
        <>
            {
                editingId !== todo.id ? 
                    <p className="font-bold text-xl ml-10">{todo.memo}</p> 
                    : <TextField 
                        id="standard-basic"  
                        variant="standard" 
                        defaultValue={todo.memo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
            }
        </>
    );
}