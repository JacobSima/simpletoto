import React from 'react'
import { Todo } from '../../types'
import TodoItem from './TodoItem'

interface props {
  todos: Todo[],
  updateCompleteStatus: (todo:Todo) => {}
  deleteTodo: (id: number) => {}
}

const Todos = ({todos, updateCompleteStatus, deleteTodo}: props) => {
  return (
    <div className="rounded-md border">
      <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium muted-foreground-text :pr-0"></th>
                  <th className="h-12 px-4 text-left align-middle font-medium muted-foreground-text :pr-0">Task</th>
                  <th className="h-12 px-4 text-left align-middle font-medium muted-foreground-text :pr-0">Title</th>
                  <th className="h-12 px-4 text-left align-middle font-medium muted-foreground-text :pr-0"></th>
                </tr>
            </thead>
            <tbody className="">
              {
                todos?.map(todo => <TodoItem  key={todo.id} todo={todo} updateCompleteStatus={updateCompleteStatus} deleteTodo={deleteTodo}/>)
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default Todos