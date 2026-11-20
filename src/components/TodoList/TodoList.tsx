import {useState} from "react";
import type {Todo} from "../../model/Todo.ts";
import {TodoForm} from "../TodoForm/TodoForm.tsx";
import styles from "./TodoList.module.css";

type TodoListProps = {
    todos: Todo[];
    onUpdate: (id: string, name: string, value: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
}

export function TodoList({todos, onUpdate, onDelete}: TodoListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);

    async function handleUpdate(id: string, name: string, value: string): Promise<boolean> {
        const succeeded = await onUpdate(id, name, value);
        if (succeeded) {
            setEditingId(null);
        }
        return succeeded;
    }

    if (todos.length === 0) {
        return <p className={styles.empty}>No todos yet.</p>
    }

    return (
        <ul className={styles.content}>{
            todos.map(todo =>
                <li key={todo.id} className={styles.item}>{
                    editingId === todo.id
                        ? <TodoForm
                            initialName={todo.name}
                            initialValue={todo.value}
                            submitLabel="Save"
                            onSubmit={(name, value) => handleUpdate(todo.id!, name, value)}
                            onCancel={() => setEditingId(null)}
                        />
                        : <>
                            <span className={styles.text}>
                                <strong>{todo.name}</strong> <span className={styles.value}>{todo.value}</span>
                            </span>
                            <button className={styles.secondary} type="button" onClick={() => setEditingId(todo.id!)}>Edit</button>
                            <button className={styles.danger} type="button" onClick={() => onDelete(todo.id!)}>Delete</button>
                        </>
                }
                </li>
            )
        }
        </ul>
    )
}
