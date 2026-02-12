let nextId = Date.now()
export default function reducer(currentTodo, action) {

    switch (action.type) {
        case "added": {

            const newTask = [...currentTodo, { id: nextId++, task: action.payload.nTask, completed: false }]


            localStorage.setItem("tasks", JSON.stringify(newTask));
            return newTask;

        }
        case "deleted": {
            const updatedTasks = currentTodo.filter((t) => {
                return t.id !== action.payload.id
            })


            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks

        }
        case "edited": {

            const editedtasks = currentTodo.map((t) => {
                if (t.id === action.payload.id) {
                    return { ...t, task: action.payload.task, details: action.payload.details }
                }
                return t;
            })
            localStorage.setItem("tasks", JSON.stringify(editedtasks));
            return editedtasks

        }
        case "completed" :{
             const updatedTasks = currentTodo.map((t) => {
             if(t.id==action.payload){
                 const updatedTodo={...t,completed:!t.completed}
                              return updatedTodo 

             }
             return t
        })
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks
        
        }
        case "get":{
            const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
           return storedTasks
        }
        }
        default: { throw Error("check the error" + action.type) }
    }

}