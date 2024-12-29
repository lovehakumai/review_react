"use client";
import React from "react";
import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export function SaveButton({color, disabled, opacity, onClick}){
    console.log("[DEBUG]2-1-1 SaveButton");
    return(
        <>
            <IconButton disabled={disabled} sx={{opacity}} onClick={onClick}>
                <SaveIcon color={color} />
            </IconButton>
        </>
    )
}
export function CancelButton({color, disabled, opacity, onClick}){
    console.log("[DEBUG]2-1-1 CancelButton");
    return(
        <>
            <IconButton disabled={disabled} sx={{opacity}} onClick={onClick}>
                <CancelIcon color={color} />
            </IconButton>
        </>
    )
}