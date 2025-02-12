import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeftSquare } from "lucide-react";

const SignUp = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!user.fullName.trim() || !user.email.trim() || !user.password.trim()) {
      return toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/user/register", user, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast({
          title: "Registration Successful",
          description: "You have successfully signed up!",
        });

        setUser({ fullName: "", email: "", password: "" });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-cyan-600">
      <Link to={"/"}>
        <Button className="flex absolute top-4 left-8 gap-4 bg-white/20 hover:bg-white/30 text-white items-center">
          <ArrowLeftSquare />
          <span>Go back</span>
        </Button>
      </Link>

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Sign Up</h2>

        <div className="space-y-4">
          <Input
            value={user.fullName}
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-xl bg-white/20 border-0 text-white placeholder-white focus:ring-2 focus:ring-cyan-400"
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
          <Input
            value={user.email}
            type="email"
            placeholder="Email Address"
            className="p-3 rounded-xl bg-white/20 border-0 text-white placeholder-white focus:ring-2 focus:ring-cyan-400"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            value={user.password}
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl bg-white/20 border-0 text-white placeholder-white focus:ring-2 focus:ring-cyan-400"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            onClick={registerHandler}
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white font-bold py-3 rounded-xl shadow-md"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
