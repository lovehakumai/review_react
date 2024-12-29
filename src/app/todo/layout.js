import React from "react";
export default function TodoLayout({children}){
    return(
        <div>
            <div className="flex justify-center">
                <header className="font-bold">Manage Your Todo</header>
            </div>
            {children}
        </div>
    );
}