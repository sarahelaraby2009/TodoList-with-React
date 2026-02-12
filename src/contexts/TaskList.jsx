import { createContext,useReducer,useContext } from "react";
import reducer from "../reducers/todoReducer";
export const TaskList = createContext(null);

export default function ReducerContext({children}) {
    const[task,taskDispatch] = useReducer(reducer,[])
    return(
        <>
         <TaskList.Provider value={{tasks:task,dispatch:taskDispatch}}>
            {children}
         </TaskList.Provider>
        </>
       
    )
}
export const useTasks= () => {
    return useContext(TaskList)
}
