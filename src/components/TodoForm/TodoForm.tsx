import {useState, type FormEvent} from "react";
import styles from "./TodoForm.module.css";

type TodoFormProps = {
    initialName?: string;
    initialValue?: string;
    submitLabel: string;
    onSubmit: (name: string, value: string) => Promise<boolean>;
    onCancel?: () => void;
}

export function TodoForm({initialName = "", initialValue = "", submitLabel, onSubmit, onCancel}: TodoFormProps) {
    const [name, setName] = useState(initialName);
    const [value, setValue] = useState(initialValue);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const succeeded = await onSubmit(name, value);
        if (succeeded && !initialName && !initialValue) {
            setName("");
            setValue("");
        }
    }

    return (
        <form className={styles.content} onSubmit={handleSubmit}>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
            {/* TODO Exercise 2: update the "value" state when the user types (look at the Name input above) */}
            <input placeholder="Value" value={value} required/>
            <button type="submit">{submitLabel}</button>
            {onCancel && <button className={styles.secondary} type="button" onClick={onCancel}>Cancel</button>}
        </form>
    )
}
