import { ToDo } from "@/lib/types"
import axios from "axios"
import { create } from "zustand"

interface ToDoStore {
  todos: ToDo[]
  fetchTodos: () => void
  addTodo: (todo: ToDo) => void
  toggleTodo: (todoId: number) => void
  deleteTodo: (todoId: number) => void
  updateTodo: (todoId: number, updatedFields: Partial<ToDo>) => void
}

const useToDoStore = create<ToDoStore>((set) => ({
  todos: [],
  fetchTodos: async () => {
    try {
      const response = await axios.get("https://648867740e2469c038fda6cc.mockapi.io/todos")
      const todos = response.data

      set({ todos })
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  },
  addTodo: async (todo) => {
    try {
      // Make a POST request to add a new todo to the API
      const response = await axios.post("https://648867740e2469c038fda6cc.mockapi.io/todos", todo)
      const newTodo = response.data

      set((state) => ({ todos: [...state.todos, newTodo] }))
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  },
  toggleTodo: async (todoId) => {
    try {
      // Make a PATCH request to update the completed status of a todo in the API
      await axios.patch(`https://648867740e2469c038fda6cc.mockapi.io/todos/${todoId}`, {
        completed: true // or !completed based on your logic
      })

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo))
      }))
    } catch (error) {
      console.error("Error toggling todo:", error)
    }
  },
  deleteTodo: async (todoId) => {
    try {
      // Make a DELETE request to remove a todo from the API
      await axios.delete(`https://648867740e2469c038fda6cc.mockapi.io/todos/${todoId}`)

      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== todoId) }))
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  },
  updateTodo: async (todoId, updatedFields) => {
    try {
      // Make a PUT or PATCH request to update a todo in the API
      await axios.put(`https://648867740e2469c038fda6cc.mockapi.io/todos/${todoId}`, updatedFields)

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === todoId ? { ...todo, ...updatedFields } : todo))
      }))
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }
}))

export default useToDoStore
