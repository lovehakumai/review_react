"use client";
import React from "react";
import { AllTodoLists } from "@/app/actions/todoAction";
// Todoアプリのコンテキスト

import { createContext, useContext, useState } from "react";
const EditContext = createContext(null);

export function EditProvider({children}){
    const [editingId, setEditingId] = useState(null);
    const [todoAll, setTodoAll] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleEditMode = async(id) =>{
        setEditingId((prevId)=> (prevId === id ? null : id));
        await latestAllTodo();
    };

    const latestAllTodo = async()=>{
        setIsLoading(true); // ローディング状態を開始
        try{
            const todos = await AllTodoLists();
            const updateFunc = setTodoAll;
            updateFunc(todos || []);

        }catch(error){
            console.log("Error: ", error);
            throw new Error("Failed in get all todos");
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <EditContext.Provider value={{ editingId, toggleEditMode, latestAllTodo, todoAll, isLoading }}>
            {children}
        </EditContext.Provider>
    );
}

export function useEdit(){
    // useContext関数を使うとコンテキストに入った情報を取得できる
    // 子コンポーネントで宣言せずここで宣言しておけば、この関数を実行するだけでコンテキストにアクセスできる
    const context = useContext(EditContext);
    console.log("useEdit context value : ", context);
    if(context === null){
        throw new Error("useEdit must be used within an EditProvider");
    }
    return context;
}