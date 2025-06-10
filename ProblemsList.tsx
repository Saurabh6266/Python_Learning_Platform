import { Problem } from "@shared/schema";
import { FaCheck, FaPlay, FaCode, FaExternalLinkAlt, FaArrowRight, FaPlus } from "react-icons/fa";

interface ProblemsListProps {
  problems: Problem[];
  loading: boolean;
  onOpenProblem: (problemId: number) => void;
}

export function ProblemsList({ problems, loading, onOpenProblem }: ProblemsListProps) {
  if (loading) {
    return <div className="p-6 text-center">Loading problems...</div>;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getProblemIcon = (problem: Problem, index: number) => {
    if (problem.isCompleted) {
      return <FaCheck className="text-white text-sm" />;
    }
    if (index === 1) { // Second problem is in progress
      return <FaPlay className="text-white text-sm" />;
    }
    return <FaCode className="text-gray-600 text-sm" />;
  };

  const getProblemStatus = (problem: Problem, index: number) => {
    if (problem.isCompleted) {
      return { text: "Solved", class: "text-secondary font-medium" };
    }
    if (index === 1) { // Second problem is in progress
      return { text: "In Progress", class: "text-primary font-medium" };
    }
    return { text: "Not Started", class: "text-gray-500" };
  };

  const getProblemCircleClass = (problem: Problem, index: number) => {
    if (problem.isCompleted) {
      return "w-8 h-8 bg-secondary rounded-full flex items-center justify-center";
    }
    if (index === 1) { // Second problem is in progress
      return "w-8 h-8 bg-primary rounded-full flex items-center justify-center";
    }
    return "w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center";
  };

  const getProblemCardClass = (problem: Problem, index: number) => {
    if (index === 1) { // Second problem is in progress
      return "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow bg-blue-50 border-primary cursor-pointer";
    }
    return "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer";
  };

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Practice Problems</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">From:</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">LeetCode</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">HackerRank</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {problems.map((problem, index) => {
            const status = getProblemStatus(problem, index);
            return (
              <div 
                key={problem.id} 
                className={getProblemCardClass(problem, index)}
                onClick={() => onOpenProblem(problem.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={getProblemCircleClass(problem, index)}>
                    {getProblemIcon(problem, index)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{problem.title}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">{problem.tags.join(', ')}</span>
                      <span className="text-sm text-gray-500">{problem.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${status.class}`}>{status.text}</span>
                  <button className="text-primary hover:text-blue-700">
                    {problem.isCompleted ? <FaExternalLinkAlt /> : index === 1 ? <FaPlay /> : <FaArrowRight />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FaPlus className="mr-2" />Load More Problems
          </button>
        </div>
      </div>
    </>
  );
}
