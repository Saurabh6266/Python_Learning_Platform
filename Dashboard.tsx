import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, LearningStage } from "@shared/schema";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { LearningContent } from "@/components/LearningContent";
import { CodeEditor } from "@/components/CodeEditor";
import { UserStats } from "@/lib/types";
import { FaHome, FaChevronRight, FaClock, FaCode, FaProjectDiagram, FaQuestion } from "react-icons/fa";

export default function Dashboard() {
  const [selectedProblemId, setSelectedProblemId] = useState<number>(0);
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);

  // Fetch user data
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user'],
  });

  // Fetch learning stages
  const { data: stages = [] } = useQuery<LearningStage[]>({
    queryKey: ['/api/stages'],
  });

  // Calculate user stats
  const userStats: UserStats = {
    problemsSolved: 47,
    projectsCompleted: 3,
    overallProgress: 65
  };

  const handleOpenProblem = (problemId: number) => {
    setSelectedProblemId(problemId);
    setIsCodeEditorOpen(true);
  };

  const handleCloseProblem = () => {
    setIsCodeEditorOpen(false);
    setSelectedProblemId(0);
  };

  // Find current stage (intermediate for demo)
  const currentStage = stages.find(stage => stage.level === 2);

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Header user={user || null} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar stages={stages} userStats={userStats} />
          
          <div className="lg:col-span-3">
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FaHome />
                  </a>
                </li>
                <li>
                  <FaChevronRight className="text-gray-400 text-sm" />
                </li>
                <li>
                  <span className="text-sm font-medium text-gray-900">Intermediate Python</span>
                </li>
              </ol>
            </nav>

            {/* Current Module Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 mb-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">Level 2</span>
                <span className="bg-warning/20 rounded-full px-3 py-1 text-sm font-medium">Intermediate</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Object-Oriented Programming</h1>
              <p className="text-blue-100 text-lg">Master classes, objects, inheritance, and polymorphism in Python</p>
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <FaClock />
                  <span className="text-sm">~4 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCode />
                  <span className="text-sm">12 Problems</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaProjectDiagram />
                  <span className="text-sm">2 Projects</span>
                </div>
              </div>
            </div>

            {/* Learning Content */}
            {currentStage && (
              <LearningContent 
                stageId={currentStage.id} 
                onOpenProblem={handleOpenProblem}
              />
            )}
          </div>
        </div>
      </div>

      {/* Code Editor Modal */}
      <CodeEditor
        problemId={selectedProblemId}
        isOpen={isCodeEditorOpen}
        onClose={handleCloseProblem}
      />

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <FaQuestion className="text-lg" />
        </button>
      </div>
    </div>
  );
}
