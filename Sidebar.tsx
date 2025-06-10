import { LearningStage } from "@shared/schema";
import { FaCheck, FaTrophy, FaProjectDiagram } from "react-icons/fa";
import { UserStats } from "@/lib/types";

interface SidebarProps {
  stages: LearningStage[];
  userStats: UserStats;
}

export function Sidebar({ stages, userStats }: SidebarProps) {
  const getStageIcon = (stage: LearningStage, index: number) => {
    if (stage.completedLessons === stage.totalLessons && stage.totalLessons > 0) {
      return <FaCheck className="text-white text-sm" />;
    }
    if (stage.isUnlocked && stage.completedLessons > 0) {
      return <span className="text-white text-xs font-bold">{index + 1}</span>;
    }
    return <span className="text-gray-600 text-xs font-bold">{index + 1}</span>;
  };

  const getStageStatus = (stage: LearningStage) => {
    if (stage.completedLessons === stage.totalLessons && stage.totalLessons > 0) {
      return { text: "Completed", class: "text-secondary" };
    }
    if (stage.isUnlocked && stage.completedLessons > 0) {
      return { 
        text: `In Progress (${stage.completedLessons}/${stage.totalLessons})`, 
        class: "text-primary" 
      };
    }
    return { text: "Locked", class: "text-gray-400" };
  };

  const getStageCircleClass = (stage: LearningStage) => {
    if (stage.completedLessons === stage.totalLessons && stage.totalLessons > 0) {
      return "w-8 h-8 bg-secondary rounded-full flex items-center justify-center";
    }
    if (stage.isUnlocked && stage.completedLessons > 0) {
      return "w-8 h-8 bg-primary rounded-full flex items-center justify-center";
    }
    return "w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center";
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
        
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-primary">{userStats.overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${userStats.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Learning Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage);
            return (
              <div key={stage.id} className="flex items-center space-x-3">
                <div className={getStageCircleClass(stage)}>
                  {getStageIcon(stage, index)}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${stage.isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {stage.name}
                  </div>
                  <div className={`text-xs ${status.class}`}>
                    {status.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">{userStats.problemsSolved}</div>
              <div className="text-xs text-gray-600">Problems Solved</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{userStats.projectsCompleted}</div>
              <div className="text-xs text-gray-600">Projects Done</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
