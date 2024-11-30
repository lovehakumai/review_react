"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function registerUser(formData){
    const name = formData.get("name");
    const email = formData.get("email");
    const gender = formData.get("gender");
    const address = formData.get("address");
    const password = formData.get("password");

    try{
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                gender,
                address,
                password,
            },
        });

        return{success:true, user: newUser};
    }catch(error){
        return{success:false, error:error.message};
    }
}