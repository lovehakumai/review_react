"use client";
import { CheckButton, EditButton, DeleteButton } from "./ListItemButtons";
import ListItemMemo from "./ListItemMemo";
import React from "react";
export default function ListItem({todoList}){
    console.log("[DEBUG]1-2 todoList in ListItem : ", todoList);
    return(
           <>
            {todoList.map((todo)=>
                    <div className="border-2 mb-10" key={todo.id}>
                        <div className="flex flex-row justify-between mb-2 mt-5">
                            <div className="flex flex-row items-center space-x-2 ">
                                <CheckButton todo={todo}/>
                                <ListItemMemo todo={todo} />
                            </div>
                            <div className="flex flex-row space-x-2 > * mr-5 font-bold">
                                <EditButton todo={todo}/>
                                <DeleteButton todo={todo} />
                            </div>
                        </div>
                        <ul className="text-xs text-right">
                            <li>create: {todo.createDate.toLocaleDateString()} - {todo.createDate.toLocaleTimeString()}</li>
                            <li>lastmodified: {todo.lastModified.toLocaleDateString()} - {todo.lastModified.toLocaleTimeString()}</li>
                        </ul>
                    </div>
            )}
            </>
    );
}