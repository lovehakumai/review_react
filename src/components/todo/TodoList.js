import AddSection from "./AddSection"


export default function TodoList(){
    return(
        <>
            <div className="flex justify-center justify-items-center bg-gray-100 h-screen">
                <div className="bg-white h-screen w-1/2 mt-10">
                    <section id="input" className="py-10 mt-10 ">
                        <form className="pb-10 flex flex-col">
                            <AddSection />
                        </form>
                    </section>
                    <section id="list">b</section>
                </div>
                
            </div>
            
        </>
    )
};