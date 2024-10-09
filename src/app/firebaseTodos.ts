import { addDoc, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
export const addTodo = async (userId: string, title: string) => {
    try {
        await addDoc(collection(db, "todos"), {
            userId,
            title,
            completed: false,
            createdAt: new Date(),
        });
    } catch (err) {
        console.error("Error adding todo:", err);
    }
};


export const getTodos = async (userId: string) => {
    const todos: any[] = [];
    try {
        const q = query(collection(db, "todos"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() });
        });
        return todos;
    } catch (err) {
        console.error("Error fetching todos:", err);
    }
};


export const updateTodo = async (todoId: string, updates: { title?: string; completed?: boolean }) => {
    try {
        const todoRef = doc(db, "todos", todoId);
        await updateDoc(todoRef, updates);
        console.log("Todo updated successfully");
    } catch (err) {
        console.error("Error updating todo:", err);
    }
};

export const deleteTodo = async (todoId: string) => {
    try {
        const todoRef = doc(db, "todos", todoId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.error("Error deleting todo:", err);
    }
};
