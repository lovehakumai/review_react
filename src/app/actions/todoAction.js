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
};

export async function updateTodo(data){
    try{
        const result = await prisma.todo.update({
            where: {
                id: data.id,
            },
            data: {
                memo: data.memo,
                lastModified: data.lastModified
            }
        })
        return result;
    }catch(error){
        console.error("Error updating todo:", error);
        throw new Error("Failed to update todo");
    }
};

export async function deleteTodo(data){
    try{
        const result = await prisma.todo.delete({
            where: {
                id: data.id,
            }
        })
        return result;
    }catch(error){
        console.log("Error deleting todo: ", error)
        throw new Error("Failed to delete todo");
    }
}

export async function AllTodoLists(){

    try{
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const todoList = await prisma.todo.findMany({
            orderBy: {
                id: "desc"
            },
        });
        return todoList;
    }catch(error){
        console.log(`Error : ${error}`);
        throw new Error("Error in All TodoLists");
    }
}

export async function handleCheckTodo(key, status) {
    const newStatus = status===true?"false":"true";
    console.log("new status: ", newStatus, "typeof : ", typeof newStatus);
    console.log("status: ", status, "typeof : ", typeof status);

    try {
        await prisma.todo.update({
            where: {
                id: key
            },
            data: {
                status: newStatus
            },
        });
    } catch (error) {
        console.log(`Error:  ${error}`);
        throw new Error("Error in handleCheckTodo");
    }
}