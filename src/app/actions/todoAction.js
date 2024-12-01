"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function saveTodo(data){
    try{
        console.log("saveTodo data: ", data);
        const result = await prisma.todo.create({
            data:{
                name: data.name,
                status: data.status,
                memo: data.memo,
                createDate: data.createDate,
                lastModified: data.lastModified
            },
        });
        return result;
    }catch(error){
        console.error("Error saving todo:", error);
        throw new Error("Failed to save todo");
    }
}

export async function AllTodoLists(){
    try{
        const todoList = await prisma.todo.findMany({
            orderBy: {
                id: "desc"
            }
        });
        return todoList;
    }catch(error){
        console.log(`Error : ${error}`);
        throw new Error("Error in All TodoLists");
    }
}