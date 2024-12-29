"use client";
import React from "react";
import ListItem from "./ListItem";
import { useEffect } from "react";
import { useEdit } from "../context/TodoContext";

export default function ListComponent(){
    const { todoAll }  = useEdit();
    console.log("[DEBUG] todoAll in ListComponent : ", todoAll);
    return(
            <ListItem todoList={todoAll} />
    );
}

