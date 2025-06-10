import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lesson, Problem, Project } from "@shared/schema";
import { TabType } from "@/lib/types";
import { ProblemsList } from "./ProblemsList";
import { ProjectsList } from "./ProjectsList";
import { 
  FaBookOpen, 
  FaCode, 
  FaProjectDiagram, 
  FaExternalLinkAlt, 
  FaClock, 
  FaPlayCircle, 
  FaCheck, 
  FaPlay, 
  FaLock 
} from "react-icons/fa";

interface LearningContentProps {
  stageId: number;
  onOpenProblem: (problemId: number) => void;
}

export function LearningContent({ stageId, onOpenProblem }: LearningContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('lessons');

  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: [`/api/stages/${stageId}/lessons`],
  });

  const { data: problems = [], isLoading: problemsLoading } = useQuery<Problem[]>({
    queryKey: [`/api/stages/${stageId}/problems`],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: [`/api/stages/${stageId}/projects`],
  });

  const getLessonIcon = (lesson: Lesson, index: number) => {
    if (lesson.isCompleted) {
      return <FaCheck className="text-white" />;
    }
    if (index === 1) { // Second lesson is in progress
      return <span className="text-white font-bold text-sm">{index + 1}</span>;
    }
    return <span className="text-gray-600 font-bold text-sm">{index + 1}</span>;
  };

  const getLessonStatus = (lesson: Lesson, index: number) => {
    if (lesson.isCompleted) {
      return { text: "Completed", class: "text-secondary font-medium", icon: <FaCheck className="mr-1" /> };
    }
    if (index === 1) { // Second lesson is in progress
      return { text: "In Progress", class: "text-primary font-medium", icon: <FaPlay className="mr-1" /> };
    }
    return { text: "Locked", class: "text-gray-400 font-medium", icon: <FaLock className="mr-1" /> };
  };

  const getLessonCircleClass = (lesson: Lesson, index: number) => {
    if (lesson.isCompleted) {
      return "w-10 h-10 bg-secondary rounded-lg flex items-center justify-center";
    }
    if (index === 1) { // Second lesson is in progress
      return "w-10 h-10 bg-primary rounded-lg flex items-center justify-center";
    }
    return "w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center";
  };

  const getLessonCardClass = (lesson: Lesson, index: number) => {
    if (index === 1) { // Second lesson is in progress
      return "border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer bg-blue-50 border-primary";
    }
    return "border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer";
  };

  const tabs = [
    { id: 'lessons' as TabType, label: 'Lessons', icon: <FaBookOpen className="mr-2" /> },
    { id: 'problems' as TabType, label: 'Problems', icon: <FaCode className="mr-2" /> },
    { id: 'projects' as TabType, label: 'Projects', icon: <FaProjectDiagram className="mr-2" /> },
    { id: 'resources' as TabType, label: 'Resources', icon: <FaExternalLinkAlt className="mr-2" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'lessons':
        if (lessonsLoading) {
          return <div className="p-6 text-center">Loading lessons...</div>;
        }
        return (
          <div className="p-6">
            <div className="grid gap-6">
              {lessons.map((lesson, index) => {
                const status = getLessonStatus(lesson, index);
                return (
                  <div key={lesson.id} className={getLessonCardClass(lesson, index)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={getLessonCircleClass(lesson, index)}>
                          {getLessonIcon(lesson, index)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                          <p className="text-gray-600 mb-3">{lesson.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span><FaClock className="mr-1 inline" />{lesson.duration} min</span>
                            <span><FaPlayCircle className="mr-1 inline" />Video + Interactive</span>
                            <span className={status.class}>
                              {status.icon}
                              {status.text}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-primary hover:text-blue-700">
                        {lesson.isCompleted ? <FaExternalLinkAlt /> : index === 1 ? <FaPlay /> : <FaLock />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'problems':
        return <ProblemsList problems={problems} loading={problemsLoading} onOpenProblem={onOpenProblem} />;

      case 'projects':
        return <ProjectsList projects={projects} loading={projectsLoading} />;

      case 'resources':
        return (
          <div className="p-6">
            <div className="text-center text-gray-500">
              <FaBookOpen className="mx-auto mb-4 text-4xl" />
              <p>Resources will be available soon!</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {renderTabContent()}
    </div>
  );
}
