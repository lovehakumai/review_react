import { Suspense } from "react";
import ListComponent from "./ListComponents";
import LoadingSpinner from "@/app/utility/LoadingSpinner";

export default function ListSection(){
    return(
        <Suspense fallback={<LoadingSpinner />}>
            <ListComponent />
        </Suspense>
    );
}