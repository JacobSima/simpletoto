import { useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'
import Todos from './components/Todos'
import { Todo, InsertToDo } from '../types'
import AddTask from './components/AddTask'

const App = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(" ");
  const [mount, setMount] = useState(false);

  const setFilterText =(searchString: string) => {
    setFilter(searchString);
  }

  const updateCompleteStatus = async(todo: Todo) => {
    setTodos(prevState => {
      const newTodos = [...prevState];
      const todoToUpdate = newTodos?.find(item => item.id === todo.id);
      if(todoToUpdate){
        todoToUpdate.completed = todo.completed;
      }
      return newTodos
    });
    // update the API call
    const headers = {'Content-Type': 'application/json', 'Authorization' : 'Bearer jacob-sima-token'};
    const options = {method: 'patch', headers, body: JSON.stringify(todo)};
    await fetch(`https://todos.appsquare.io/todos/${todo.id}`, options)
    return todos;
  }

  const deleteTodo = async(id: number) => {
    setTodos(prevState => {
      const newTodos = [...prevState];
      return newTodos?.filter(todo => todo.id !== id);
    });
    // update the API call
    const headers = {'Content-Type': 'application/json', 'Authorization' : 'Bearer jacob-sima-token'};
    const options = {method: 'delete', headers};
    await fetch(`https://todos.appsquare.io/todos/${id}`, options)
    return todos;
  }

  const addNewTodo = async(todo: InsertToDo) => {
    const headers = {'Content-Type': 'application/json', 'Authorization' : 'Bearer jacob-sima-token'};
    const options = {method: 'post', headers, body: JSON.stringify(todo)};
    const response =  await fetch("https://todos.appsquare.io/todos", options)
    const data = await response.json();
     const newTodo: Todo = {...data.todo[0]}
    setTodos(prevState => [...prevState, newTodo]);
    return todos;
  }

  const fetchData = async(toFilter=false) => {
    const headers = {'Content-Type': 'application/json', 'Authorization' : 'Bearer jacob-sima-token'};
    const options = {method: 'get', headers};
    const response =  await fetch("https://todos.appsquare.io/todos", options)
    const data = await response.json();
    toFilter 
    ? setTodos(todos?.filter(todo => todo?.title?.toLowerCase()?.includes(filter?.toLowerCase())))
    : setTodos(data.todos);
  }

  useEffect(() => {
    fetchData();
    setMount(true);
  }, [])

  useEffect(() => {
    if(mount){
      (filter === null || filter === undefined || filter === '')
      ? fetchData()
      : fetchData(true);
    }
  },[filter])

  return (
    <>
     <div className=" h-screen flex flex-col max-w-2xl mx-auto space-y-8 p-8">
      <div>
        <h1 className="font-bold text-2xl">Welcome back!</h1>
        <p className="muted-foreground-text">Here's a list of your tasks for today.</p>
          <div className="flex items-center my-3 ">
            <input 
              type="text"
              placeholder="Filter tasks..."
              onChange={(e) => setFilterText(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 
                text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm 
                file:font-medium placeholder:muted-foreground-text focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 
                max-w-sm blur-none focus:ring-black"
            />
          </div>
          <Todos todos={todos} updateCompleteStatus={updateCompleteStatus} deleteTodo={deleteTodo}/>
          <AddTask addNewTodo={addNewTodo}/>  
      </div>
     </div>
    </>
  )
}

export default App
