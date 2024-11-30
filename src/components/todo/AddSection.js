"use client";
import { IconButton, TextField } from "@mui/material"
import { CancelButton, SaveButton } from "./ActionButtons";
import { useState } from "react";
import { useReducer } from "react";
import { saveTodo } from "@/app/actions/todoAction";

const initialState = {
    active: "show_unavailable",
}

function reducer(state, action){
    switch(action.type){
        case "SHOW_AVAILABLE":
            return {active: "show_available"};
        case "SHOW_UNAVAILABLE":
            return {active: "show_unavalilable"};
        case "HIDDEN":
            return {active: "hidden"};
        default:
            state;
    }
}

export default function AddSection(){
    const [formData, setFormData]=useState({
        name: '',
        status: '',
        memo: '',
        createDate: ''
    });
    const [message, setMessage] = useState('');
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = useState("")

    // ハンドラー関数
    const handleFocus =()=>{
        const value = e.target.value;
        if(value !== ""){
            dispatch({type: "SHOW_UNAVAILABLE"})
        }else{
            dispatch({type: "SHOW_AVAILABLE"})
    }}
    const handleBlur=()=>{
        if(inputValue===""){
            dispatch({type: "SHOW_UNAVAILABLE"})
        }else{
            dispatch({type: "SHOW_AVAILABLE"})
        }
    }
    const handleChange=(e)=>{
        const value=e.target.value;
        setInputValue(value);
        if(value !== ""){
            dispatch({type: "SHOW_AVAILABLE"})
        }else{
            dispatch({type: "SHOW_UNAVAILABLE"})
        }
    }

    return(
        <form className="pb-10 flex flex-col">
            <TextField id="standard-basic" label="Your New Todo" variant="standard" className="w-3/4" value={inputValue} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
            <div className="flex justify-end">
                {state.active==="show_available" ? <><SaveButton color="primary"/><CancelButton color="error"/></>:<><SaveButton color="disabled"/><CancelButton color="disabled"/></>}
            </div>
        </form>
    );
}