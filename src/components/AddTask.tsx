import React, {useState} from 'react'
import { InsertToDo, Todo } from '../../types'

interface props {
  addNewTodo: (todo: InsertToDo) => {}
}


const AddTask = ({addNewTodo}: props) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async() => {

    if(title === null || title === undefined || title === "") return;
    setSubmitting(true);
    await addNewTodo({title, complete:false});

    // reset field
    setTitle("");

    setSubmitting(false);
  }

  return (
    <div className="flex items-center my-3 ">
      <form className='flex h-10 w-full'>
        <input 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 
            py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50 focus:ring-black" 
          name="title" 
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder="What do you need to get done today?" />
          
        <button hidden type="submit">Submit</button>
      </form>
      
      {
        submitting ? (<svg className="rotate down" xmlns="http://www.w3.org/2000/svg" width="20"height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>) : (<button 
        className="mr-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
        <svg onClick={() => onSubmit()} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      </button>)
      }
      
    </div>
  )
}

export default AddTask