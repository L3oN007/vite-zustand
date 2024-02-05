import React, { useEffect, useState } from "react"
import useToDoStore from "./store/useTodos"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { toast } from "sonner"

function App() {
  const { todos, deleteTodo, fetchTodos, updateTodo } = useToDoStore((state) => ({
    todos: state.todos,
    deleteTodo: state.deleteTodo,
    fetchTodos: state.fetchTodos,
    updateTodo: state.updateTodo
  }))

  useEffect(() => {
    // Fetch todos when the component mounts
    fetchTodos()
  }, [fetchTodos])

  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo(todoId)
    toast.error("Todo with ID " + todoId + " deleted successfully!")
  }

  const [newTitle, setNewTitle] = useState("")

  const handleUpdateTodo = async (todoId: string) => {
    if (!newTitle) {
      // You might want to add some validation or error handling here
      return
    }

    await updateTodo(todoId, { title: newTitle })
    setNewTitle("") // Clear the input field after updating
    toast.success("Todo with ID " + todoId + " updated successfully!")
  }

  const handleFetchTodos = async () => {
    await fetchTodos()
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">ToDo List</h1>
      <Button onClick={handleFetchTodos} className="mb-4 bg-green-500 text-white">
        Fetch New Todos
      </Button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">
            {todo.title} - {todo.completed ? "Completed" : "Not Completed"}
            <div className="mt-2 flex space-x-2">
              <Input
                type="text"
                placeholder="New Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-2"
              />
              <Button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white">
                Delete
              </Button>
              <Button onClick={() => handleUpdateTodo(todo.id)} className="bg-blue-500 text-white">
                Update
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
