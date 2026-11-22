# Exercises

This is a small Todo app. Most of it already works, but some parts are missing.
Your job is to fill in the gaps. Look for `TODO Exercise X` comments in the code.

## Getting started

1. Start the backend server from https://github.com/juventusHF/web-todo-exercise-server
2. Run `npm install` in this folder
3. Run `npm run dev` and open http://localhost:5173 in the browser

Keep the browser open while you work. Every time you save a file, the page updates by itself.

## Exercise 1: Show the todos (JSX)

**File:** `src/components/TodoItem/TodoItem.tsx`

In the browser you see three empty rows with an "Edit" button, but no text.

Inside the `<span className={styles.text}>`, show the **name** and the **value** of the todo.
The name should be bold (use `<strong>`).

💡 **Hint:** In JSX you use curly braces `{ }` to show a JavaScript value, e.g. `{todo.name}`.

✅ **Done when:** you can see the name and value of every todo in the list.

## Exercise 2: Type into the form (state and event handlers)

**File:** `src/components/TodoForm/TodoForm.tsx`

You can type into the "Name" field, but not into the "Value" field. Why?
The input shows the `value` state, but the state never changes.

Add an `onChange` event handler to the "Value" input that updates the `value` state.

💡 **Hint:** Look at the "Name" input right above. It does the same thing for `name`.

✅ **Done when:** you can type into both fields and add a new todo.

## Exercise 3: Delete a todo (props and event handlers)

**Files:** `src/components/TodoItem/TodoItem.tsx` and `src/components/TodoList/TodoList.tsx`

There is no way to delete a todo yet. `App` already has a `removeTodo` function and passes it
to `TodoList` as the `onDelete` prop. But `TodoList` does not pass it on to `TodoItem`, and
`TodoItem` has no "Delete" button.

Do it in small steps:

1. In `TodoItem.tsx`, add the prop `onDelete: () => void;` to `TodoItemProps`
   and take it out of the props in the function parameters (like `onEdit`).
2. In `TodoItem.tsx`, add a "Delete" button after the "Edit" button that calls `onDelete` when clicked.
   Use `className={styles.danger}` to make it red.
3. In `TodoList.tsx`, take `onDelete` out of the props in the function parameters.
4. In `TodoList.tsx`, pass `onDelete` to `<TodoItem>`. `TodoItem` doesn't know the id of the todo,
   so give it a small function that calls `onDelete` with the id: `() => onDelete(todo.id!)`

💡 **Hint:** Look at how the "Edit" button and the `onEdit` prop work. Delete works the same way.

✅ **Done when:** clicking "Delete" removes the todo from the list (and it is still gone after reloading the page).

## Exercise 4: Show a message when the list is empty (state)

**File:** `src/components/TodoList/TodoList.tsx`

If there are no todos, the user sees nothing at all. Show the text `No todos yet.` instead.

💡 **Hint:** `todos` is an array. `todos.length` tells you how many todos there are.
A component can `return` different JSX depending on an `if`.
Use `<p className={styles.empty}>` so it looks nice.

✅ **Done when:** you see "No todos yet." when there are no todos, and the list when there are some.
Delete all your todos to check it.

## Exercise 5 (bonus): Your own component (components and props)

**Files:** a new file `src/components/TodoCount/TodoCount.tsx` and `src/components/App/App.tsx`

Show how many todos there are below the title, e.g. `3 todos`.

1. Create a new component `TodoCount` in a new file `src/components/TodoCount/TodoCount.tsx`.
2. It gets one prop: `count` (a `number`). It shows the text `{count} todos`.
3. Use it in `App.tsx` below the title and pass it the number of todos.

💡 **Hint:** Look at an existing component like `TodoItem` to see how a component with props is written.
Don't forget to `export` your component and to `import` it in `App.tsx`.

✅ **Done when:** the number updates when you add or delete a todo.

⭐ **Extra:** Show `1 todo` instead of `1 todos` when there is only one.
