import {useState} from "react";
import type {Todo} from "../../model/Todo.ts";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
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
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    isEditing={editingId === todo.id}
                    onEdit={() => setEditingId(todo.id!)}
                    onCancel={() => setEditingId(null)}
                    onUpdate={(name, value) => handleUpdate(todo.id!, name, value)}
                    onDelete={() => onDelete(todo.id!)}
                />
            )
        }
        </ul>
    )
}
