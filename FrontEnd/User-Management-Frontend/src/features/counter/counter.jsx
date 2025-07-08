import React from "react";

import { useSelector,useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";
import { Button } from "@/components/ui/button";

function Counter(){
    const count = useSelector(state=>state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <Button 
                aria-label="Increment Value"
                onClick={()=>dispatch(increment())}
                >Increment</Button>
            </div>
            <span>{count}</span>
            <Button aria-label="Decrement Value" onClick={()=>dispatch(decrement())} >Decrement</Button>
        </div>
    )
}

export default Counter