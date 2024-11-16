import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  required: boolean;
}

interface QuestionnaireFormProps {
  onClose: () => void;
  onSubmit: (data: { title: string; deadline: string; questions: Question[] }) => void;
}

export default function QuestionnaireForm({ onClose, onSubmit }: QuestionnaireFormProps) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        { id: crypto.randomUUID(), text: newQuestion, required: true },
      ]);
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, deadline, questions });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Novo Questionário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Data Limite
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Perguntas</label>
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Digite uma pergunta"
            />
            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Adicionar
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {questions.map((question) => (
            <div key={question.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">{question.text}</span>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(question.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Questionário
          </button>
        </div>
      </form>
    </div>
  );
}