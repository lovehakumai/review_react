"use client";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    name: yup
            .string()
            .required('Name is Mandatory')
            .max(20, 'Name should be at most 20 letters'),
    gender: yup
            .string()
            .required('Gender is Mandatory'),
    email: yup
            .string()
            .required('Email is Mandatory')
            .email('Email should be in proper form'),
    address: yup
            .string()
            .required('Address is Mandatory'),
    password: yup
            .string()
            .required("Password is mandatory")
            .matches(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+$/, "Password can only contain alphanumeric characters and symbols")
            .min(8,"Password must be at least 8 characters")
        });

export default function FormYup(){

    // フォームの初期化
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        defaultValues : {
            name : "",
            email : "",
            gender : "",
            address: "",
            password:""
        },
        resolver: yupResolver(schema),
    });

    // サブミット時の処理
    const onsubmit = data => console.log(data);
    const onerror = err => console.log(err);

    // 値の確認はwatch関数を使う
    const nameValue = watch("name");

    return(

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <form 
                    onSubmit={handleSubmit(onsubmit, onerror)} 
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg"
                    noValidate>
                    
                    {/* Name Field */}
                    <label 
                        htmlFor="name"
                        className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        1-What is your name?
                    </label><br/>
                    <input 
                        type="text" 
                        id="name" 
                        {...register('name')}
                        className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 
                                    ${errors.name ? "border-red-500" : "border-gray-300"}`} />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}

                    {/* Email */}
                    <label 
                        htmlFor="email"
                        className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        2-Email
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 
                            ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                    {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}

                    {/* gender */}
                    <label 
                        htmlFor="gender"
                        className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            3-Gender
                        </label><br />
                    <select
                        id="gender"
                        {...register("gender")}
                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                            ${errors.gender ? "border-red-500" : "border-gray-300"}`}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="femail">Female</option>
                    </select>
                    {errors.gender && (<p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>)}

                    {/* Address */}
                    <label 
                        htmlFor="address"
                        className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        4-Address
                    </label>
                    <input 
                        type="text" 
                        id="address"
                        {...register("address")}
                        className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 
                            ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                    {errors.address && (<p className="text-red-500 text-sm mt-1">{errors.address.message}</p>)}

                    {/* Password */}
                    <label 
                        htmlFor="password"
                        className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        5-Password
                    </label>
                    <input 
                        type="text" 
                        id="password"
                        {...register("password")}
                        className={`w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 
                           ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                    {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                        <buttton type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 cursor-pointer active:bg-blue-800 select-none">
                            Submit
                        </buttton>
                    </div>
                </form>
            </div>
    );
}