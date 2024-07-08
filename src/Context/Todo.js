import {createContext,useContext} from "react";

//to dos is nothing but an array of a todo msg 
export const TodoContext = createContext({
    todos : [
        {
            id : 1,
            todo:"todo msg",
            completed:false,
        }
        
    ],
    addTodo: (todo) => {},  //create a new todo(todo is an object containing above 3 values)
    updateTodo: (id , todo) => {}, //update todo msg
    deleteTodo: (id) => {}, //delete
    toggleComplete: (id) => {} //set completed to true
    //we can import and define these functions wherever needed
})

export const TodoProvider = TodoContext.Provider

export default function useTodo(){
    return(
        useContext(TodoContext)
    )
}