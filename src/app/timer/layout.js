export default function TimerLayout({children}){
    return(
        <div>
            <div className="flex justify-center">
                <header className="font-bold">Can you Stop this timer in 0?</header>
            </div>        
            {children}
        </div>
    );
}