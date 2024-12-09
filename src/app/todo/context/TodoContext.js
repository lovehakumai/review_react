"use client";

import { AllTodoLists } from "@/app/actions/todoAction";
// Todoアプリのコンテキスト

import { createContext, useContext, useState } from "react";
const EditContext = createContext();

export function EditProvider({children}){
    const [editingId, setEditingId] = useState(null);
    const [todoAll, setTodoAll] = useState([]);

    const toggleEditMode = (id) =>{
        setEditingId((prevId)=> (prevId === id ? null : id));
        latestAllTodo();
    };

    const latestAllTodo = async()=>{
        try{
            const todos = await AllTodoLists();
            setTodoAll(todos);
        }catch(error){
            console.log("Error: ", error);
            throw new Error("Failed in get all todos");
        }
    }

    return(
        <EditContext.Provider value={{ editingId, toggleEditMode, latestAllTodo, todoAll }}>
            {children}
        </EditContext.Provider>
    );
}

export function useEdit(){
    // useContext関数を使うとコンテキストに入った情報を取得できる
    // 子コンポーネントで宣言せずここで宣言しておけば、この関数を実行するだけでコンテキストにアクセスできる
    return useContext(EditContext);
}