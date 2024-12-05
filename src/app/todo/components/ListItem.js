"use client";
import { IconButton, Checkbox } from "@mui/material"; // Material-UIのコンポーネント
import { CheckBoxOutlineBlank } from "@mui/icons-material"; // Material-UIのアイコン
import { handleCheckTodo } from "@/app/actions/todoAction";


export default function ListItem({todo}){
    const handleClick=()=>{
        handleCheckTodo(todo.id, todo.status);
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