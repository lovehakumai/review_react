"use client"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import {Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton} from '@mui/material';

import { useState, useRef } from "react"

export default function TimerCount(){
    const id = useRef(null);
    const [count, setCount] = useState(10);
    const [gameResult, setGameResult] = useState(0);

    const handleStart=()=>{
        if(id.current === null){
            id.current = setInterval(()=>setCount(c => c - 1), 100);
        }
    };

    const handleEnd = () =>{
        clearInterval(id.current);
        id.current = null;
        if(count === 0){
            setGameResult(1);
        }else if(count !== 0){
            setGameResult(-1);
        }else{
            setGameResult(0);
        }
    };

    const handleReset = ()=>{
        clearInterval(id.current);
        id.current = null;
        setCount(10)
        setGameResult(0);
    }

    const containerClass = gameResult === 1
        ? "bg-green-200"
        : gameResult === -1
        ? "bg-red-200"
        : "bg-gray-100"

    return(
        <>
            <div className={`flex flex-col justify-center items-center h-screen space-y-6 ${ containerClass }`}>
                <p>
                    {gameResult===0 && <p className='text-4xl mb-4'><br /></p>}
                    {gameResult===1 && <p className="text-4xl font-bold text-blue-600 mb-4">Congratulation</p>}
                    {gameResult===-1  && <p className="text-4xl font-bold text-red-600 mb-4">Failed...Let's try again!</p>}
                </p>
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