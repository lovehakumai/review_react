"use client"

import Link from 'next/link';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import {Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton} from '@mui/material';
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import { useState } from 'react';

// Googleフォントを有効化
import { Inconsolata } from 'next/font/google';
import { Timer } from '@mui/icons-material';
const fnt = Inconsolata({ subsets: ['latin'] })

// 表示用のメニューを準備
const menu = [
    {title: 'タイマーアプリ', href: '', icon: AccessAlarmRoundedIcon},
    {title: 'ユーザ登録', href: '', icon: AccountBoxRoundedIcon},
    {title: 'TODOアプリ', href: '', icon: AssignmentTurnedInRoundedIcon},
    {title: '書籍検索', href:'', icon: BookRoundedIcon}
  
  ]

export default function ClientDrawer({ children }) {
const [show, setShow] = useState(false);
const handleDraw = () => setShow(!show);

return (
    <html lang="ja">
    <body className={fnt.className}>
        <IconButton onClick={handleDraw} className='absolute top-4 left-4 text-blue-400 hover:text-lightblue'><DensityMediumRoundedIcon fontSize='large'/></IconButton>
        <Drawer anchor='left' open={show} onClose={()=>setShow(false)}>
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