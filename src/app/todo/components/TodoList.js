import InputSection from "./InputSection"
import AddSection from "./InputSection"
import ListSection from "./ListSection"


export default function TodoList(){
    return(
        <>
            <div className="flex justify-center justify-items-center bg-gray-100 h-screen">
                <div className="bg-white h-screen w-1/2 mt-10">
                    <InputSection />
                    <ListSection />
                </div>
            </div>
            
        </>
    )
};