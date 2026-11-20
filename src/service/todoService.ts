import type {Todo} from "../model/Todo.ts";

const BASE_URL = "http://localhost:3000/todos";

async function checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    return response;
}

export async function readTodos(): Promise<Todo[]> {
    const response: Response = await checkResponse(await fetch(BASE_URL));
    return await response.json();
}

export async function addTodo(name: string, value: string): Promise<Todo> {
    const response: Response = await checkResponse(await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"name": name, "value": value}),
    }));
    return await response.json();
}

export async function updateTodo(id: string, name: string, value: string): Promise<Todo> {
    const response: Response = await checkResponse(await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"name": name, "value": value}),
    }));
    return await response.json();
}

export async function deleteTodo(id: string): Promise<void> {
    await checkResponse(await fetch(`${BASE_URL}/${id}`, {method: "DELETE"}));
}
