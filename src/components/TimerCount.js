"use client"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import {Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton} from '@mui/material';

import { useState, useRef } from "react"
import { Play } from 'next/font/google';

export default function TimerCount(){
    const id = useRef(null);
    const [count, setCount] = useState(10);
    const [isCongrats, setIsCongrats] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const handleStart=()=>{
        if(id.current === null){
            id.current = setInterval(()=>setCount(c => c - 1), 100);
        }
    };

    const handleEnd = () =>{
        clearInterval(id.current);
        id.current = null;
        if(count === 0){
            setIsCongrats(true);
        }else{
            setIsWrong(true);
        }
    };

    const handleReset = ()=>{
        clearInterval(id.current);
        id.current = null;
        setCount(10)
        setIsCongrats(false);
        setIsWrong(false);
    }

    return(
        <>
            <div className={`flex flex-col justify-center items-center h-screen space-y-6 ${isCongrats ? "bg-blue-200":"bg-white"} ${isWrong?"bg-red-200":"bg-white"}`}>
                {isCongrats && <p className="text-4xl font-bold text-blue-600 mb-4">Congratulation</p>}
                {isWrong && <p className="text-4xl font-bold text-red-600 mb-4">Failed...Let's try again!</p>}
                <div>
                    <p className='text-6xl font-bold mb-2'>{count}</p>
                </div>
                <div>
                    <IconButton onClick={handleStart}><PlayCircleFilledRoundedIcon fontSize='large'/></IconButton>
                    <IconButton onClick={handleEnd}><StopCircleRoundedIcon fontSize='large'/></IconButton>
                    <IconButton onClick={handleReset}><RestartAltRoundedIcon fontSize='large'/></IconButton>
                </div>
            </div>
        </>
    );
}