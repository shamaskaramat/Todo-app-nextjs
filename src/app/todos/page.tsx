// TodoPage.js
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addTodo, getTodos, updateTodo, deleteTodo } from "../firebaseTodos";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";

export default function TodoPage() {
    const [user, setUser] = useState<any>(null);
    const [todos, setTodos] = useState<any[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editingTodoTitle, setEditingTodoTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchTodos(currentUser.uid);
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchTodos = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const fetchedTodos = await getTodos(userId);
            setTodos(fetchedTodos ?? []);
        } catch (err) {
            setError("Failed to fetch todos. Please try again.");
            console.error("Error fetching todos:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                await addTodo(user.uid, newTodo);
                setNewTodo("");
                fetchTodos(user.uid);
                toast.success("Todo added successfully!");
            } catch (err) {
                setError("Failed to add todo. Please try again.");
                console.error("Error adding todo:", err);
                toast.error("Failed to add todo. Please try again.");
            }
        }
    };

    const handleUpdateTodo = async (todoId: string, updatedFields: any) => {
        try {
            await updateTodo(todoId, updatedFields);
            fetchTodos(user.uid);
            setEditingTodoId(null);
            toast.success("Todo updated successfully!");
        } catch (err) {
            setError("Failed to update todo. Please try again.");
            console.error("Error updating todo:", err);
            toast.error("Failed to update todo. Please try again.");
        }
    };

    const handleDeleteTodo = async (todoId: string) => {
        try {
            await deleteTodo(todoId);
            fetchTodos(user.uid);
            toast.success("Todo deleted successfully!");
        } catch (err) {
            setError("Failed to delete todo. Please try again.");
            console.error("Error deleting todo:", err);
            toast.error("Failed to delete todo. Please try again.")
        }
    };

    const handleEditTodo = (todoId: string, title: string) => {
        setEditingTodoId(todoId);
        setEditingTodoTitle(title);
    };

    const handleCancelEdit = () => {
        setEditingTodoId(null);
        setEditingTodoTitle("");
    };

    if (!user) return <Spinner />;

    return (
        <>
            <ToastContainer />
            <Header />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Todo List</h1>

                    {/* Add Todo */}
                    <div className="mb-6">
                        <div className="flex">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add new todo"
                            />
                            <button
                                onClick={handleAddTodo}
                                className={`bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-200 ${!newTodo.trim() ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={!newTodo.trim()}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Loading Spinner */}
                    {loading && <Spinner />}

                    {/* Todo List */}
                    {!loading && (
                        <ul className="space-y-3">
                            {todos.length === 0 ? (
                                <p>No todos yet. Add your first one!</p>
                            ) : (
                                todos.map((todo) => (
                                    <li
                                        key={todo.id}
                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                                    >
                                        {editingTodoId === todo.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editingTodoTitle}
                                                    onChange={(e) => setEditingTodoTitle(e.target.value)}
                                                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateTodo(todo.id, { title: editingTodoTitle })}
                                                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200"
                                                    >
                                                        <FaSave />
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition duration-200"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-grow text-gray-800">
                                                    {todo.title}
                                                </span>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditTodo(todo.id, todo.title)}
                                                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTodo(todo.id)}
                                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
