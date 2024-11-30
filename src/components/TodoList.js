import { Button, IconButton, Box } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

export default function TodoLost(){
    const addRecord =()=>1;
    const editRecord =()=>console.log("dev");
    const checkTodo =()=>console.log("dev");
    const removeRecord =()=>console.log("dev");

    return(
        <>
            <div className="flex justify-center justify-items-center bg-gray-100 h-screen">
                <div className="bg-white h-screen w-1/2 mt-10 relative">
                    <div className="absolute right-0 top-0">
                        <IconButton onClick={addRecord} ><AddBoxIcon fontSize="large"/></IconButton>
                    </div>
                </div>
                
            </div>
            
        </>
    )
};