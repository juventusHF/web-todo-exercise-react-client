import type {Todo} from "../../model/Todo.ts";
import {TodoForm} from "../TodoForm/TodoForm.tsx";
import styles from "./TodoItem.module.css";

type TodoItemProps = {
    todo: Todo;
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onUpdate: (name: string, value: string) => Promise<boolean>;
    onDelete: () => void;
}

export function TodoItem({todo, isEditing, onEdit, onCancel, onUpdate, onDelete}: TodoItemProps) {
    return (
        <li className={styles.content}>{
            isEditing
                ? <TodoForm
                    initialName={todo.name}
                    initialValue={todo.value}
                    submitLabel="Save"
                    onSubmit={onUpdate}
                    onCancel={onCancel}
                />
                : <>
                    <span className={styles.text}>
                        <strong>{todo.name}</strong> <span className={styles.value}>{todo.value}</span>
                    </span>
                    <button className={styles.secondary} type="button" onClick={onEdit}>Edit</button>
                    <button className={styles.danger} type="button" onClick={onDelete}>Delete</button>
                </>
        }
        </li>
    )
}
