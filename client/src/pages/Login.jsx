import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeftSquare } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return toast({
        title: "Error",
        description: "Email and password cannot be empty",
        variant: "destructive",
      });
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", user, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
        });

        setUser({ email: "", password: "" });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-br from-[#ff6a00] to-[#1e3c72]">
      <Link to={"/"}>
        <Button className="flex absolute top-4 left-8 gap-4 bg-white/20 hover:bg-white/30 text-white items-center">
          <ArrowLeftSquare />
          <span>Go back</span>
        </Button>
      </Link>

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-white text-4xl font-extrabold text-center mb-6 tracking-wide">
          Welcome Back
        </h2>

        <div className="space-y-6">
          <Input
            value={user.email}
            type="text"
            placeholder="Enter your Email"
            className="p-4 rounded-xl bg-white/20 border-0 text-white placeholder-white focus:ring-4 focus:ring-[#ff6a00] transition-all duration-300"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            value={user.password}
            type="password"
            placeholder="Enter your Password"
            className="p-4 rounded-xl bg-white/20 border-0 text-white placeholder-white focus:ring-4 focus:ring-[#ff6a00] transition-all duration-300"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            onClick={loginHandler}
            className="w-full bg-[#ff6a00] hover:bg-[#ff4a00] transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-md animate-pulse"
          >
            Login
          </Button>
        </div>

        <p className="text-center text-white mt-6">
          Dont have an account? {" "}
          <Link to="/signup" className="text-yellow-300 hover:underline transition-all duration-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;