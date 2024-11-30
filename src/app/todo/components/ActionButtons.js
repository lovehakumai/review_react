"use client";
import { Button, IconButton, Box } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState,  } from "react";


const addRecord =()=>console.log("dev");
const editRecord =()=>console.log("dev");
const checkTodo =()=>console.log("dev");
const removeRecord =()=>console.log("dev");

export function SaveButton({className, color, onSave}){
    return(
        <>
            <IconButton onClick={onSave}>
                <SaveIcon className={...className} color={color} />
            </IconButton>
        </>
    )
}
export function CancelButton({className, color, onCancel}){
    return(
        <>
            <IconButton onClick={onCancel}>
                <CancelIcon className={...className} color={color}/>
            </IconButton>
        </>
    )
}