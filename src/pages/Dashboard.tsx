import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentTextIcon, ChartBarIcon, ClipboardDocumentListIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import ActivityList from '../components/ActivityList';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

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

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats: StatCard[] = [
    {
      title: 'Receita Total',
      value: 'R$ 150.000',
      change: 12,
      changeType: 'increase',
      icon: <BanknotesIcon className="h-6 w-6" />,
    },
    {
      title: 'Despesas',
      value: 'R$ 85.000',
      change: 5,
      changeType: 'decrease',
      icon: <ArrowTrendingDownIcon className="h-6 w-6" />,
    },
    {
      title: 'Lucro Líquido',
      value: 'R$ 65.000',
      change: 18,
      changeType: 'increase',
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      description: 'Relatório Financeiro Janeiro 2024',
      type: 'report',
      date: '2024-01-15T10:00:00',
      details: {
        status: 'completed',
        progress: 100,
        summary: 'Relatório mensal processado com sucesso. Receita total: R$ 150.000',
      },
    },
    {
      id: '2',
      description: 'Análise de Anomalias em Andamento',
      type: 'analysis',
      date: '2024-01-14T15:30:00',
      details: {
        status: 'in_progress',
        progress: 75,
        summary: 'Detectadas 3 anomalias nos dados financeiros do último trimestre',
      },
    },
    {
      id: '3',
      description: 'Novo Questionário de Avaliação',
      type: 'questionnaire',
      date: '2024-01-13T09:45:00',
      details: {
        status: 'pending',
        progress: 30,
        summary: '5 respostas recebidas de 15 esperadas',
      },
    },
  ];

  const quickActions = [
    {
      title: 'Relatórios',
      description: 'Gerencie seus relatórios financeiros',
      icon: <DocumentTextIcon className="h-6 w-6" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      onClick: () => navigate('/reports'),
    },
    {
      title: 'Análises',
      description: 'Visualize análises e anomalias',
      icon: <ChartBarIcon className="h-6 w-6" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      onClick: () => navigate('/analysis'),
    },
    {
      title: 'Questionários',
      description: 'Gerencie questionários de clientes',
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      onClick: () => navigate('/questionnaires'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
                <div className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
                  stat.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.changeType === 'increase' ? '+' : '-'}{Math.abs(stat.change)}%
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">{stat.title}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.bgColor} p-6 rounded-lg hover:shadow-md transition-shadow text-left`}
          >
            <div className="flex items-center mb-2">
              <div className={`${action.textColor} mr-2`}>
                {action.icon}
              </div>
              <h2 className={`text-lg font-medium ${action.textColor}`}>{action.title}</h2>
            </div>
            <p className={`text-sm ${action.textColor} mt-1 opacity-90`}>{action.description}</p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Atividade Recente</h2>
        <ActivityList activities={recentActivity} />
      </div>
    </div>
  );
}