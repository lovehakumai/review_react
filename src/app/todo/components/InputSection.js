import { InputButtons, NewTodo } from "./InputComponents";

export default function InputSection(){
    return(
        <section id="input" className="py-10 mt-10 ">
            <form className="pb-10 flex flex-col">
                <NewTodo />
                <div className="flex justify-end">
                    <InputButtons />
                </div>
            </form>
        </section>
    );
}