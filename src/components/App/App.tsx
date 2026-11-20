import type {Todo} from "../../model/Todo.ts";
import {useState, useEffect} from "react";
import {addTodo, deleteTodo, readTodos, updateTodo} from "../../service/todoService.ts";
import {TodoForm} from "../TodoForm/TodoForm.tsx";
import {TodoList} from "../TodoList/TodoList.tsx";
import styles from "./App.module.css";

function App() {

    const [allTodos, setAllTodos] = useState<Todo[]>([])
    const [error, setError] = useState<string | null>(null)

    async function run(action: () => Promise<void>): Promise<boolean> {
        try {
            await action();
            setError(null);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            return false;
        }
    }

    async function createTodo(name: string, value: string): Promise<boolean> {
        return run(async () => {
            const created: Todo = await addTodo(name, value);
            setAllTodos(todos => [...todos, created]);
        });
    }

    async function editTodo(id: string, name: string, value: string): Promise<boolean> {
        return run(async () => {
            const updated: Todo = await updateTodo(id, name, value);
            setAllTodos(todos => todos.map(todo => todo.id === id ? updated : todo));
        });
    }

    async function removeTodo(id: string): Promise<boolean> {
        return run(async () => {
            await deleteTodo(id);
            setAllTodos(todos => todos.filter(todo => todo.id !== id));
        });
    }

    useEffect(() => {
        readTodos()
            .then(setAllTodos)
            .catch(e => setError(e instanceof Error ? e.message : String(e)));
    }, []);

  return (
    <div className={styles.content}>
        <h1 className={styles.title}>Todos</h1>
        <TodoForm submitLabel="Add" onSubmit={createTodo}/>
        {error && <p className={styles.error}>{error}</p>}
        <TodoList todos={allTodos} onUpdate={editTodo} onDelete={removeTodo}/>
    </div>
  )
}

export default App
