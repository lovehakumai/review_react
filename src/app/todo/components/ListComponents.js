"use client";

import ListItem from "./ListItem";
import { useEffect } from "react";
import { useEdit } from "../context/TodoContext";

export default function ListComponent(){
    const { latestAllTodo, todoAll}  = useEdit();
    
    useEffect(()=>{
        // latestAllTodoは非同期関数なのでuseEffectでは直接実行できない
        //  非同期(async/await)処理した関数でラップする

        const fetchTodos = async()=>{
            try{
                await latestAllTodo();
            }catch(error){
                console.error("Error fetching todos: ", error);
            }
        };

        fetchTodos();
    }, []);

    return(
            <ListItem todoList={todoAll} />
    );
}

