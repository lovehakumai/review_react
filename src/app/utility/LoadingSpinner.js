export default function LoadingSpinner(){
    return(
        <div className="flex flex-col justify-center items-center h-1/2">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <div className="mt-10">NOW LOADING...</div>
        </div>
    );
}