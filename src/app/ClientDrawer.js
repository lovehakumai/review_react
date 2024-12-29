"use client"
import React from "react";
import Link from 'next/link';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import HomeIcon from '@mui/icons-material/Home';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import {Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton} from '@mui/material';
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import { useEffect, useState } from 'react';

// Googleフォントを有効化
import { Inconsolata } from 'next/font/google';
import { Timer } from '@mui/icons-material';
const fnt = Inconsolata({ subsets: ['latin'] })

// 表示用のメニューを準備
const menu = [
    {title: 'ホーム', href: '/', icon: HomeIcon },
    {title: 'タイマーアプリ', href: '/timer', icon: AccessAlarmRoundedIcon},
    {title: 'ユーザ登録', href: '/register', icon: AccountBoxRoundedIcon},
    {title: 'TODOアプリ', href: '/todo', icon: AssignmentTurnedInRoundedIcon},
    {title: '書籍検索', href:'/search', icon: BookRoundedIcon}
  ]

export default function ClientDrawer({ children }) {
console.log("[DBUG]CHILDREN : ", children);
const [show, setShow] = useState(false);
const [isClient, setIsClient] = useState(false);

// クライアントサイドのレンダリング完了後にtrueに変更する
useEffect(()=>{
    setIsClient(true);
}, []);

const handleDraw = () => setShow(!show);


// 初期化が完了するまで何も描画しない
if(!isClient) return null;

return (
    <html lang="ja">
    <body className={fnt.className}>
        <IconButton 
            onClick={handleDraw}
            color='primary' 
            className='absolute top-4 left-4 hover:text-lightblue'
        >
            <DensityMediumRoundedIcon fontSize='large'/>
        </IconButton>
        <Drawer anchor='left' open={show}  disabled={false} onClose={()=>setShow(false)}>
        <List>
            {menu.map(obj =>{
            const Icon = obj.icon;
            return(
                <ListItem key={obj.title}>
                <ListItemButton href={obj.href}>
                    <ListItemIcon><Icon /></ListItemIcon>
                    <ListItemText primary={obj.title} />
                </ListItemButton>
                </ListItem>
            );
            })}
        </List>
        </Drawer>
        <h1 className="text-4xl text-indigo-800 font-bold mt-5 flex justify-center my-4">
        React Portfolio</h1>
        <div className="ml-2">
        {children}
        </div>
    </body>
    </html>
);
}