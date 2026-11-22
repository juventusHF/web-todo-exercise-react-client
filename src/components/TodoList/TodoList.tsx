import {useState} from "react";
import type {Todo} from "../../model/Todo.ts";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import styles from "./TodoList.module.css";

type TodoListProps = {
    todos: Todo[];
    onUpdate: (id: string, name: string, value: string) => Promise<boolean>;
    onDelete: (id: string) => Promise<boolean>;
}

// TODO Exercise 4: also take "onDelete" out of the props
export function TodoList({todos, onUpdate}: TodoListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);

    async function handleUpdate(id: string, name: string, value: string): Promise<boolean> {
        const succeeded = await onUpdate(id, name, value);
        if (succeeded) {
            setEditingId(null);
        }
        return succeeded;
    }

    // TODO Exercise 3: if there are no todos, show the text "No todos yet." instead of an empty list
    //  (use a <p> with className={styles.empty})

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
                    // TODO Exercise 4: pass an onDelete function to TodoItem that deletes this todo
                />
            )
        }
        </ul>
    )
}
