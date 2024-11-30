import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function saveTodo(data){
    try{
        const result = await prisma.todo.create({
            data:{
                name: data.name,
                status: data.status,
                memo: data.memo,
                createDate: new Date(),
                lastmodifie: new Date()
            },
        });
        return result;
    }catch(error){
        console.error("Error saving todo:", error);
        throw new Error("Failed to save todo");
    }
}