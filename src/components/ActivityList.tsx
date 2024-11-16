import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentTextIcon, ChartBarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface ActivityItem {
  id: string;
  description: string;
  type: 'report' | 'analysis' | 'questionnaire';
  date: string;
  details?: {
    status?: string;
    progress?: number;
    summary?: string;
  };
}

interface ActivityListProps {
  activities: ActivityItem[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  const navigate = useNavigate();
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'report':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'analysis':
        return <ChartBarIcon className="h-5 w-5 text-green-500" />;
      case 'questionnaire':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-purple-500" />;
    }
  };

  const handleActivityClick = (activity: ActivityItem) => {
    if (expandedActivity === activity.id) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(activity.id);
    }
  };

  const navigateToSection = (type: ActivityItem['type']) => {
    switch (type) {
      case 'report':
        navigate('/reports');
        break;
      case 'analysis':
        navigate('/analysis');
        break;
      case 'questionnaire':
        navigate('/questionnaires');
        break;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white rounded-lg border hover:shadow-md transition-all duration-200"
        >
          <div
            onClick={() => handleActivityClick(activity)}
            className="flex items-start space-x-3 p-4 cursor-pointer"
          >
            <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.date).toLocaleString('pt-BR')}
                  </p>
                </div>
                {activity.details?.status && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.details.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.details.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {expandedActivity === activity.id && activity.details && (
            <div className="px-4 pb-4 pt-2 border-t">
              {activity.details.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progresso</span>
                    <span>{activity.details.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${activity.details.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {activity.details.summary && (
                <p className="text-sm text-gray-600 mb-3">{activity.details.summary}</p>
              )}

              <button
                onClick={() => navigateToSection(activity.type)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Ver detalhes →
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}