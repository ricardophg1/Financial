import { ClipboardDocumentListIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Answer {
  id: string;
  questionText: string;
  response: string;
  answeredBy: string;
  answeredAt: string;
}

interface QuestionnaireDetailsProps {
  questionnaire: {
    id: string;
    title: string;
    deadline: string;
    status: 'pending' | 'completed';
    responseCount: number;
    questions: { id: string; text: string; required: boolean }[];
    responses: {
      id: string;
      respondent: string;
      answers: Answer[];
      submittedAt: string;
    }[];
  };
  onClose: () => void;
}

export default function QuestionnaireDetails({ questionnaire, onClose }: QuestionnaireDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <ClipboardDocumentListIcon className="h-8 w-8 text-gray-400 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{questionnaire.title}</h2>
                <p className="text-sm text-gray-500">
                  Prazo: {new Date(questionnaire.deadline).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Fechar</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Perguntas</h3>
              <ul className="space-y-2">
                {questionnaire.questions.map((question) => (
                  <li key={question.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{question.text}</span>
                    {question.required && (
                      <span className="text-xs text-red-600">Obrigatória</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Respostas Recebidas</h3>
              <div className="space-y-4">
                {questionnaire.responses.map((response) => (
                  <div key={response.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{response.respondent}</p>
                        <p className="text-xs text-gray-500">
                          Enviado em: {new Date(response.submittedAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <dl className="space-y-2">
                      {response.answers.map((answer) => (
                        <div key={answer.id} className="grid grid-cols-1 gap-1">
                          <dt className="text-sm font-medium text-gray-700">{answer.questionText}</dt>
                          <dd className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                            {answer.response}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <div className="text-sm text-gray-500">
                Total de respostas: {questionnaire.responseCount}
              </div>
              <button
                onClick={() => {
                  // Implement export functionality
                  console.log('Exportando respostas...');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Exportar Respostas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}