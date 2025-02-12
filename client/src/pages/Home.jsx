import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const { toast } = useToast();

  const addOrUpdateTodo = async () => {
    if (!title.trim() || !description.trim()) {
      return toast({
        variant: "destructive",
        description: "Title and description cannot be empty",
      });
    }

    try {
      if (editingTodo) {
        const res = await axios.put(
          `http://localhost:8000/api/v1/todo/update/${editingTodo._id}`,
          { title, description },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        if (res.data.success) {
          toast({ variant: "default", description: res.data.message });
          setTodos(todos.map(todo => (todo._id === editingTodo._id ? res.data.todo : todo)));
          setEditingTodo(null);
        }
      } else {
        const res = await axios.post(
          "http://localhost:8000/api/v1/todo",
          { title, description },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        if (res.data.success) {
          toast({ variant: "default", description: res.data.message });
          setTodos([...todos, res.data.todo]);
        }
      }

      setTitle("");
      setDescription("");
    } catch (error) {
      toast({ variant: "destructive", description: error.response?.data?.message || "Something went wrong" });
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/todo/delete/${id}`);
      if (res.data.success) {
        setTodos(todos.filter(todo => todo._id !== id));
        toast({ variant: "default", description: "Todo deleted successfully" });
      }
    } catch (error) {
      toast({ variant: "destructive", description: error.response?.data?.message || "Delete failed" });
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo");
        if (res.data.success) setTodos(res.data.todos);
      } catch (error) {
        toast({ variant: "destructive", description: error.response?.data?.message || "Fetch failed" });
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen pt-12 w-full flex flex-col bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* Cyberpunk Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1a1a3e,_#000)] opacity-50"></div>

      <div className="flex flex-col md:flex-row items-start justify-center mt-24 px-6 md:px-20 gap-10 z-10">
        
        {/* ADD TODO SECTION */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-purple-500 w-full md:w-1/3 transform hover:scale-105 transition-transform">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent text-center mb-6 tracking-wide">
            {editingTodo ? "UPDATE TODO ✏️" : "ADD TODO "}
          </h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter task title..."
            className="w-full p-4 bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 shadow-lg"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            className="w-full p-4 bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 shadow-lg mt-4"
          />
          <button
            onClick={addOrUpdateTodo}
            className="w-full flex items-center justify-center mt-4 bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105 transition-all duration-500 text-white font-bold py-4 rounded-xl shadow-lg"
          >
            <PlusIcon className="mr-2" />
            {editingTodo ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* TODO LIST SECTION */}
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-wide">
            All Todos 📝
          </h2>
          <ul className="space-y-6">
            {todos.map(todo => (
              <li key={todo._id} className="flex items-center justify-between bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-lg border border-gray-700 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                <div>
                  <h3 className="text-xl font-semibold">{todo.title}</h3>
                  <p className="text-gray-300">{todo.description}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => startEditing(todo)} className="text-yellow-400 hover:scale-110 transition-all">
                    <PencilIcon size={22} />
                  </button>
                  <button onClick={() => deleteTodoHandler(todo._id)} className="text-red-500 hover:scale-110 transition-all">
                    <TrashIcon size={22} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
