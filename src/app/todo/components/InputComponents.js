"use client";
import { TextField } from "@mui/material";
import { SaveButton } from "./ActionButtons";
import { CancelButton } from "./ActionButtons";

export function NewTodo(){
    
    const [inputValue, setInputValue] = useState("");
    const [buttonStyle, setButtonStyle] = useState("SHOW_DISABLED");

    const handleChange = (e) =>{
        const value = e.target.value;
        if(value !== ""){
            setInputValue(value);
            setButtonStyle("SHOW");
        }
    }
    const handleFocus = () =>{
        setButtonStyle("SHOW_DISABLED");
    }
    const handleBlur = (e) =>{
        const value = e.target.value;
        if(value !== ""){
            setButtonStyle("SHOW");
        }else{
            setButtonStyle("HIDDEN");
        }
    }


    return(
        <TextField 
            id="standard-basic" 
            label="Your New Todo" 
            variant="standard" 
            className="w-3/4" 
            value={inputValue} 
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
}

export function InputButtons(){
    return(
        {}
    );
}