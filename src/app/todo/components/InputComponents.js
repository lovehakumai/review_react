"use client";
import { TextField } from "@mui/material";
import { SaveButton } from "./ActionButtons";
import { CancelButton } from "./ActionButtons";
import { useState } from "react";
import { saveTodo } from "@/app/actions/todoAction";

export function NewTodo(){
    
    // 初期値設定
    const [inputValue, setInputValue] = useState("");
    const [buttonStyle, setButtonStyle] = useState("SHOW_DISABLED");

    // ハンドラー関数
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
    const handleSave = async () => {
        if(!inputValue.trim()) return; // inputValueの値が存在しない場合はreturn;
        setButtonStyle("SHOW_DISABLED"); //　ボタンを無効化
        try{
            const todoData = {
                name : "default",
                status : "false",
                memo : inputValue,
                createDate : new Date(),
                lastModified : new Date()
            }
            console.log("todoData: ", todoData);
            await saveTodo(todoData);
            alert("Todo saved successfully")
            setInputValue("") // 値のリセット
        }catch(error){
            console.error("Error in saving todo: ", error);
        }finally{
            setButtonStyle("SHOW_DISABLED");
        }
    }
    const handleCancel = () =>{
        setInputValue("");
        setButtonStyle("SHOW_DISABLED")
    }

    return(
        <>
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
            <div className="flex justify-end">
                <InputButtons buttonStyle={buttonStyle} onSave={handleSave} onCancel={handleCancel}/>
            </div>
        </>
    );
}

function InputButtons({ buttonStyle, onSave, onCancel }){
    const SaveButtonProps = 
        buttonStyle==="SHOW" 
            ? {color: "primary", disabled: false, opacity:1, onClick: onSave }
            : buttonStyle==="SHOW_DISABLED" 
            ? {color: "disabled", disabled: true, opacity: 0.5}
            : {color: "", disabled: true, opacity: 0.5}

    const CancelButtonProps = 
        buttonStyle==="HIDDEN"
            ? {color: "", disabled: true, opacity: 0.5}
            : {color: "error" , disabled: false, opacity: 1, onClick: onCancel};

    return(
        <div>
            <SaveButton {...SaveButtonProps}/>
            <CancelButton {...CancelButtonProps}/>
        </div>
    );
}