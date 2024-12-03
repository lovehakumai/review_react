import InputSection from "./InputSection"
import AddSection from "./InputSection"
import ListSection from "./ListSection"


export default function TodoList(){
    return(
        <>
            <div className="flex justify-center justify-items-center bg-gray-100 h-screen">
                <div className="bg-white h-screen mt-10 w-8/12 px-20 pt-10">
                    <InputSection />
                    <ListSection />
                </div>
            </div>
            
        </>
    )
};