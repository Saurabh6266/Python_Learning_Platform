import { User } from "@shared/schema";
import { FaPython, FaTrophy, FaSignOutAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout", {});
    },
    onSuccess: () => {
      localStorage.removeItem("user");
      queryClient.setQueryData(["/api/user"], null);
      queryClient.clear();
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <FaPython className="text-primary text-2xl" />
              <h1 className="text-xl font-bold text-gray-900">PyLearn</h1>
            </div>
            <nav className="hidden md:flex space-x-6 ml-8">
              <a href="#" className="text-primary font-medium border-b-2 border-primary pb-4">
                Learning Path
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
                Problems
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
                Projects
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
                Resources
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <FaTrophy className="text-warning" />
              <span className="text-sm font-medium">{user?.points || 0} XP</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="flex items-center space-x-1"
              >
                <FaSignOutAlt className="text-xs" />
                <span className="hidden sm:block">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
