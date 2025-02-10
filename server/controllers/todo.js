import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid fields entered" });
    }
    const todo = new Todo({ title, description });
    todo.save();
    res
      .status(201)
      .json({ success: true, message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({ success: true, todos });
  } catch (error) {
    console.log(error);
  }
};

export const getTodoById = async (req, res) => {
    try {
        const {id} = req.params;
    } catch (error) {
        console.log(error);
        
    }
}

export const updateTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const title = req.body;
       
        const todo = await Todo.findByIdAndUpdate(id, title, {new:true});
        return res.status(200).json({ success: true, todo, message: 'Todo updated successfully'});


    } catch (error) {
        console.log(error);
        
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        return res.status(200).json({ success: true, todo, message: 'Todo deleted successfully'});
        

    } catch (error) {
        console.log(error);
        
    }
}