import { useState } from 'react';
import { ChartBarIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';

interface Anomaly {
  id: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
}

interface DataPoint {
  id: string;
  category: string;
  value: number;
  period: string;
}

export default function Analysis() {
  const [activeSection, setActiveSection] = useState<'anomalies' | 'crossref' | null>(null);
  
  // Mock data for demonstration
  const mockAnomalies: Anomaly[] = [
    {
      id: '1',
      description: 'Despesa acima do padrão histórico',
      severity: 'high',
      date: '2024-01-15',
    },
    {
      id: '2',
      description: 'Variação significativa na receita',
      severity: 'medium',
      date: '2024-01-10',
    },
  ];

  const mockDataPoints: DataPoint[] = [
    { id: '1', category: 'Receitas', value: 50000, period: '2024-Q1' },
    { id: '2', category: 'Despesas', value: 35000, period: '2024-Q1' },
    { id: '3', category: 'Receitas', value: 45000, period: '2023-Q4' },
    { id: '4', category: 'Despesas', value: 30000, period: '2023-Q4' },
  ];

  const getSeverityColor = (severity: Anomaly['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Análise de Dados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setActiveSection(activeSection === 'anomalies' ? null : 'anomalies')}
            className={`bg-white p-4 rounded-lg border transition-all ${
              activeSection === 'anomalies' ? 'ring-2 ring-indigo-500' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <ChartBarIcon className="h-6 w-6 text-indigo-500" />
              <h2 className="text-lg font-medium text-gray-900">Análise de Anomalias</h2>
            </div>
            <p className="text-sm text-gray-600 text-left">
              Visualize e analise anomalias detectadas nos dados financeiros.
            </p>
          </button>

          <button
            onClick={() => setActiveSection(activeSection === 'crossref' ? null : 'crossref')}
            className={`bg-white p-4 rounded-lg border transition-all ${
              activeSection === 'crossref' ? 'ring-2 ring-indigo-500' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <ArrowsPointingInIcon className="h-6 w-6 text-indigo-500" />
              <h2 className="text-lg font-medium text-gray-900">Cruzamento de Dados</h2>
            </div>
            <p className="text-sm text-gray-600 text-left">
              Compare e cruze dados de diferentes relatórios e períodos.
            </p>
          </button>
        </div>

        {activeSection === 'anomalies' && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Anomalias Detectadas</h3>
            <div className="space-y-4">
              {mockAnomalies.map((anomaly) => (
                <div key={anomaly.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{anomaly.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(anomaly.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'crossref' && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Comparação de Períodos</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      2024-Q1
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      2023-Q4
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {['Receitas', 'Despesas'].map((category) => {
                    const currentPeriod = mockDataPoints.find(
                      (dp) => dp.category === category && dp.period === '2024-Q1'
                    );
                    const previousPeriod = mockDataPoints.find(
                      (dp) => dp.category === category && dp.period === '2023-Q4'
                    );
                    const variation =
                      currentPeriod && previousPeriod
                        ? ((currentPeriod.value - previousPeriod.value) / previousPeriod.value) * 100
                        : 0;

                    return (
                      <tr key={category}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          R$ {currentPeriod?.value.toLocaleString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          R$ {previousPeriod?.value.toLocaleString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              variation > 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {variation.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}