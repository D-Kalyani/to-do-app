import React, { useState } from 'react'
import useTodo from '../Context/Todo';

//here we will create actual todoitem displayed 
//functionalities
//1.is complete?
//2 edit todod(only if it is editable)
//3 delete todo 

function TodoItem({todo}) {             //displaying every single todo called from app.js(this todo is an object)

    const {toggleComplete,updateTodo,deleteTodo} = useTodo()

    const [isTodoEditable , setIsTodoEditable] = useState(false)         // for the edit button, coz we cannot edit if todo is completed
    const [todoMsg , setTodoMsg] = useState(todo.todo)                   //the new updated todo task 
                                                                         //todo.todo - the todo property of todo object 

    const editTodo = () =>                                               
    {
        updateTodo(todo.id,{...todo,todo: todoMsg})                      
        setIsTodoEditable(false)                                          //while editing we cannot edit so todoeitable is false duh
    }

    const toggleCompleted = () =>                                         //give id of todo to overwrite completed as true
    {
        toggleComplete(todo.id)
    }
  return (
    <div
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
    }`}
>
    <input   //the checkbox
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}                          //whatever value exists in object
        onChange={toggleCompleted}                        // if change call our function
    />
    <input    //the textbox
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}                                      //display whatever current todomsg
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
    />
    {/* Edit, Save Button */}
    <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {                                                //if can be updated then update else prev msgi
                editTodo();
            } else setIsTodoEditable((prev) => !prev);                          //if false set it to true
        }}
        disabled={todo.completed}
    >
        {isTodoEditable ? "📁" : "✏️"}
    </button>
    {/* Delete Todo Button */}
    <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
    >
        ❌
    </button>
</div>
  )
}

export default TodoItem