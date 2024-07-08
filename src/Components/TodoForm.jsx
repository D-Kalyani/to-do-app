import React, { useState } from 'react'
import useTodo from '../Context/Todo'

//here we will get a todo from form which we will save 

function TodoForm() {

    const [todo , setTodo] = useState("") // individual todo from user
    
    const {addTodo} = useTodo()    //to add the above todo to our array
    
    const add = (e) => {           //actual function to add on submit
        e.preventDefault()

        if(!todo) return    //setTodo has not set anything

        addTodo({ todo ,completed:false})   //id we will set while adding this todo to the array
        setTodo("")                         
    }
    
  return (
    <form onSubmit={add} className="flex">
    <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}     //setTodo("")clears this field of prev todo
        onChange={(e) => {
            setTodo(e.target.value)
        }}
        //this setTodo sets our todo
    />
    <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
    </button>
</form>
  )
}

export default TodoForm