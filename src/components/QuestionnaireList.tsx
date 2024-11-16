interface Questionnaire {
  id: string;
  title: string;
  deadline: string;
  status: 'pending' | 'completed';
  responseCount: number;
}

interface QuestionnaireListProps {
  questionnaires: Questionnaire[];
  onQuestionnaireClick: (id: string) => void;
}

export default function QuestionnaireList({ questionnaires, onQuestionnaireClick }: QuestionnaireListProps) {
  const getStatusColor = (status: Questionnaire['status']) => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-4">
      {questionnaires.map((questionnaire) => (
        <div
          key={questionnaire.id}
          onClick={() => onQuestionnaireClick(questionnaire.id)}
          className="bg-white p-4 rounded-lg border hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{questionnaire.title}</h3>
              <p className="text-sm text-gray-500">
                Prazo: {new Date(questionnaire.deadline).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-gray-500">
                Respostas: {questionnaire.responseCount}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(questionnaire.status)}`}
            >
              {questionnaire.status === 'completed' ? 'Concluído' : 'Pendente'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}