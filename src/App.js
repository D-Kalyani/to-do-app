import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import {TodoProvider} from "./Context/Todo"
import { useEffect, useState } from "react";





function App() {

    const [todos,setTodos] = useState([]) //array of todos objects
    
    const addTodo = (todo) => //takes single todo and adds it to todos array
    {
        setTodos((prev) => [{id:Date.now(),...todo},...prev])     }          //takes all prev todos,destructs them i.e spreads them one by one
                                                                            //you cannot add the passed todo as it is coz it is an object so we need to pass it as an object and for values you dont have or can be overwritten by og object in context just spread them also only define known val
    

    const updateTodo = (id,todo) =>                                              //we take id and text of todo to be updated
                                                                                //from all prev values we match id 
    {
        setTodos((prev) => 
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {                                                 //same for delete
                                                                                //we filter the todo whose id matches
        setTodos((prev) => prev.filter((todo) => todo.id!==id))
    }

    const toggleComplete = (id) =>                                               //if the i matches then set toggle complete to true
    {
        setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo,completed : !prevTodo.completed} : prevTodo))  //here we are destructing the prevtodo single todo and accessing the values inside it to toggle the completed property
    }

    useEffect(() => { //to load already existing items in todo list on screen

        const todos = JSON.parse(localStorage.getItem("todos")) // first we get already existing todos from local storage and convert it to json form in todos array
        console.log(todos)

        if(todos && todos.length>0){
            setTodos(todos) // if todos is not empty we set the todos to display 
        }
 

    },[])//no dependencies coz if we a todos here everytime someting is added or removed, we will "get" it from local storage every time 
   // this function is only loading 

   useEffect(() =>                    // to save todos to local storage everytime a new todo is added to todos
    {
        localStorage.setItem("todos",JSON.stringify(todos)) // setting new todos everytime todos is updated    
    }
    ,[todos])



  return (

    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
  
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm /> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                    {todos?.map((todo) => (                         //iterating through all todos passing the i as key 
                            <div key={todo.id}
                            className='w-full'>
                            
                            <TodoItem todo={todo} />                     

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </TodoProvider>
  );

}


export default App
