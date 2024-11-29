export default function RegisterLayout({children}){
    return(

        <div>
            <div className="flex justify-center">
                <header className="font-bold">Type Your Info</header>
            </div>
            {children}
        </div>
    );
}