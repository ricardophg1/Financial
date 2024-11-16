import { useState } from 'react';
import QuestionnaireList from '../components/QuestionnaireList';
import QuestionnaireForm from '../components/QuestionnaireForm';
import QuestionnaireDetails from '../components/QuestionnaireDetails';

interface Question {
  id: string;
  text: string;
  required: boolean;
}

interface Answer {
  id: string;
  questionText: string;
  response: string;
  answeredBy: string;
  answeredAt: string;
}

interface Questionnaire {
  id: string;
  title: string;
  deadline: string;
  status: 'pending' | 'completed';
  responseCount: number;
  questions: Question[];
  responses: {
    id: string;
    respondent: string;
    answers: Answer[];
    submittedAt: string;
  }[];
}

export default function Questionnaires() {
  const [showForm, setShowForm] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  
  // Mock data for demonstration
  const mockQuestionnaires: Questionnaire[] = [
    {
      id: '1',
      title: 'Avaliação de Risco Financeiro',
      deadline: '2024-02-28',
      status: 'pending',
      responseCount: 5,
      questions: [
        { id: '1', text: 'Qual sua tolerância a risco?', required: true },
        { id: '2', text: 'Qual seu objetivo de investimento?', required: true },
        { id: '3', text: 'Qual sua experiência com investimentos?', required: true }
      ],
      responses: [
        {
          id: '1',
          respondent: 'João Silva',
          submittedAt: '2024-01-15T10:30:00',
          answers: [
            {
              id: '1',
              questionText: 'Qual sua tolerância a risco?',
              response: 'Moderada',
              answeredBy: 'João Silva',
              answeredAt: '2024-01-15T10:30:00'
            },
            {
              id: '2',
              questionText: 'Qual seu objetivo de investimento?',
              response: 'Aposentadoria',
              answeredBy: 'João Silva',
              answeredAt: '2024-01-15T10:30:00'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Perfil de Investidor',
      deadline: '2024-02-15',
      status: 'completed',
      responseCount: 10,
      questions: [
        { id: '1', text: 'Como você reage a perdas no mercado?', required: true },
        { id: '2', text: 'Qual seu horizonte de investimento?', required: true }
      ],
      responses: [
        {
          id: '1',
          respondent: 'Maria Santos',
          submittedAt: '2024-01-10T14:20:00',
          answers: [
            {
              id: '1',
              questionText: 'Como você reage a perdas no mercado?',
              response: 'Mantenho a calma e aguardo recuperação',
              answeredBy: 'Maria Santos',
              answeredAt: '2024-01-10T14:20:00'
            }
          ]
        }
      ]
    }
  ];

  const handleQuestionnaireClick = (id: string) => {
    const questionnaire = mockQuestionnaires.find(q => q.id === id);
    if (questionnaire) {
      setSelectedQuestionnaire(questionnaire);
    }
  };

  const handleCreateQuestionnaire = (data: { title: string; deadline: string; questions: Question[] }) => {
    console.log('Novo questionário:', data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Questionários</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Questionário
          </button>
        </div>

        {showForm ? (
          <QuestionnaireForm
            onClose={() => setShowForm(false)}
            onSubmit={handleCreateQuestionnaire}
          />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Questionários Ativos</h2>
              <QuestionnaireList
                questionnaires={mockQuestionnaires}
                onQuestionnaireClick={handleQuestionnaireClick}
              />
            </div>
          </>
        )}
      </div>

      {selectedQuestionnaire && (
        <QuestionnaireDetails
          questionnaire={selectedQuestionnaire}
          onClose={() => setSelectedQuestionnaire(null)}
        />
      )}
    </div>
  );
}