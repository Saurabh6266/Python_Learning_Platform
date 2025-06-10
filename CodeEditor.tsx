import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Problem } from "@shared/schema";
import { CodeEditorProps } from "@/lib/types";
import { FaTimes, FaPlay, FaCheck } from "react-icons/fa";

export function CodeEditor({ problemId, isOpen, onClose }: CodeEditorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("Python3");
  const [code, setCode] = useState(`# Write your solution here
class Solution:
    def twoSum(self, nums, target):
        # Your code here
        pass`);

  const { data: problem } = useQuery<Problem>({
    queryKey: [`/api/problems/${problemId}`],
    enabled: isOpen && problemId > 0,
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center min-h-screen p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-4/5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {problem?.title || 'Loading...'}
            </h3>
            {problem && (
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <div className="flex-1 flex">
          {/* Problem Description */}
          <div className="w-1/2 p-4 border-r border-gray-200 overflow-y-auto">
            <h4 className="font-semibold text-gray-900 mb-3">Problem Description</h4>
            <div className="prose prose-sm text-gray-600">
              {problem ? (
                <>
                  <p>{problem.description}</p>
                  {problem.sourceUrl && (
                    <p className="mt-4">
                      <a 
                        href={problem.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-blue-700"
                      >
                        View on {problem.source} →
                      </a>
                    </p>
                  )}
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900">Example:</h5>
                    <pre className="bg-gray-100 p-3 rounded text-sm mt-2 overflow-x-auto">
{problem.title === "Two Sum" ? 
`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].` :
problem.title === "Valid Parentheses" ?
`Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false` :
`Example will be shown here`}
                    </pre>
                  </div>
                </>
              ) : (
                <p>Loading problem details...</p>
              )}
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="w-1/2 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="Python3">Python3</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="JavaScript">JavaScript</option>
              </select>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 flex items-center">
                  <FaPlay className="mr-1" />Run
                </button>
                <button className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-blue-700 flex items-center">
                  <FaCheck className="mr-1" />Submit
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-auto">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-gray-100 resize-none outline-none"
                placeholder="Write your solution here..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
