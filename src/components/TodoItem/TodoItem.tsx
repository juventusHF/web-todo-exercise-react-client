import type {Todo} from "../../model/Todo.ts";
import {TodoForm} from "../TodoForm/TodoForm.tsx";
import styles from "./TodoItem.module.css";

type TodoItemProps = {
    todo: Todo;
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onUpdate: (name: string, value: string) => Promise<boolean>;
    // TODO Exercise 4: add an "onDelete" prop (a function without parameters that returns nothing)
}

export function TodoItem({todo, isEditing, onEdit, onCancel, onUpdate}: TodoItemProps) {
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
                        {/* TODO Exercise 1: show the name (bold) and the value of the todo */}
                    </span>
                    <button className={styles.secondary} type="button" onClick={onEdit}>Edit</button>
                    {/* TODO Exercise 4: add a "Delete" button that calls onDelete when clicked */}
                </>
        }
        </li>
    )
}
