import { AllTodoLists,handleCheckTodo } from "@/app/actions/todoAction";
import { Delete, Edit, CheckBoxOutlineBlank, CheckBox, Check } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default async function ListComponent(){
    const todoList = await AllTodoLists();

    return(
        <>
            {todoList.map((todo)=>(
                <div className="border-2 mb-10" key={todo.id}>
                    <div className="flex flex-row justify-between mb-2 mt-5">
                    <div className="flex flex-column items-start ">
                    <form action={handleCheckTodo()}>
                    <input type="hidden" name="key" value={todo.key} />
                    <input type="hidden" name="status" value={todo.status} />
                        <IconButton 
                            aria-label={todo.status===true ? "check-on":"check-off"} 
                            size="small" 
                            color="disabled" 
                            type="submit"
                        >
                            {todo.status===true?<CheckBox />:<CheckBoxOutlineBlank />}
                        </IconButton>

                    </form>
                    <p className="font-bold text-xl ml-10">{todo.memo}</p>
                    </div>
                        <div className="flex flex-row space-x-2 > * mr-5 font-bold">
                            <IconButton aria-label="edit" size="small" color="primary"><Edit /></IconButton>
                            <IconButton aria-label="delete" size="small" color="error"><Delete /></IconButton>
                        </div>
                    </div>
                    <ul className="text-xs text-right">
                        <li>create: {todo.createDate.toLocaleDateString()} - {todo.createDate.toLocaleTimeString()}</li>
                        <li>lastmodified: {todo.lastModified.toLocaleDateString()} - {todo.lastModified.toLocaleTimeString()}</li>
                    </ul>
                </div>
            ))}
        </>
    );
}

