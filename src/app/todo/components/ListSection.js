"use client";
import { useEffect } from "react";
import ListComponent from "./ListComponents";
import LoadingSpinner from "@/app/utility/LoadingSpinner";
import React from "react";
import { useEdit } from "../context/TodoContext";

export default function ListSection(){
    const {isLoading, latestAllTodo} = useEdit();

    useEffect(()=>{
        latestAllTodo();
    }, []);

    if(isLoading) {
        return <LoadingSpinner />
    }

    return(
        <>
            <ListComponent />
        </>
    );
}