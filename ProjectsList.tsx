import { Project } from "@shared/schema";
import { FaTasks, FaUniversity, FaArrowRight } from "react-icons/fa";

interface ProjectsListProps {
  projects: Project[];
  loading: boolean;
}

export function ProjectsList({ projects, loading }: ProjectsListProps) {
  if (loading) {
    return <div className="p-6 text-center">Loading projects...</div>;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-blue-100 text-blue-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getProjectIcon = (project: Project) => {
    if (project.title.toLowerCase().includes('todo')) {
      return <FaTasks className="text-primary text-3xl" />;
    }
    if (project.title.toLowerCase().includes('banking')) {
      return <FaUniversity className="text-secondary text-3xl" />;
    }
    return <FaTasks className="text-primary text-3xl" />;
  };

  const getProjectGradient = (project: Project) => {
    if (project.title.toLowerCase().includes('todo')) {
      return 'bg-gradient-to-br from-blue-100 to-blue-200';
    }
    if (project.title.toLowerCase().includes('banking')) {
      return 'bg-gradient-to-br from-green-100 to-green-200';
    }
    return 'bg-gradient-to-br from-purple-100 to-purple-200';
  };

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recommended Projects</h2>
        <p className="text-sm text-gray-600 mt-1">Apply your OOP knowledge with these hands-on projects</p>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-full h-32 ${getProjectGradient(project)} rounded-lg mb-4 flex items-center justify-center`}>
                {getProjectIcon(project)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">~{project.estimatedTime} hours</span>
                </div>
                <button className="text-primary hover:text-blue-700 font-medium text-sm">
                  Start Project <FaArrowRight className="ml-1 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
