import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { FaPython, FaUser, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await apiRequest("POST", "/api/auth/login", { username });
      return response.json();
    },
    onSuccess: (user) => {
      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}`,
      });
      setLocation("/");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter your username",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(username.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaPython className="text-primary text-4xl" />
            <h1 className="text-3xl font-bold text-gray-900">PyLearn</h1>
          </div>
          <p className="text-gray-600">Start your Python learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700 block">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                disabled={loginMutation.isPending}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              "Logging in..."
            ) : (
              <>
                Continue Learning
                <FaArrowRight className="ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-4">New to PyLearn? Just enter any username to get started!</p>
            <div className="flex justify-center space-x-4 text-xs">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Beginner Friendly</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Interactive Coding</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}