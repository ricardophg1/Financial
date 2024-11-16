import { DocumentTextIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Report {
  id: string;
  title: string;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'error';
  fileSize?: string;
  type?: string;
  summary?: {
    totalRevenue?: number;
    totalExpenses?: number;
    period?: string;
  };
}

interface ReportDetailsProps {
  report: Report;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function ReportDetails({ report, onClose, onDelete }: ReportDetailsProps) {
  const handleDownload = () => {
    console.log(`Downloading report ${report.id}`);
    // Implement actual download logic
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
      onDelete(report.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-gray-400 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{report.title}</h2>
                <p className="text-sm text-gray-500">
                  Enviado em {new Date(report.uploadedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Informações do Arquivo</h3>
              <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {report.status === 'processed' && 'Processado'}
                    {report.status === 'processing' && 'Processando'}
                    {report.status === 'error' && 'Erro'}
                  </dd>
                </div>
                {report.fileSize && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tamanho</dt>
                    <dd className="mt-1 text-sm text-gray-900">{report.fileSize}</dd>
                  </div>
                )}
                {report.type && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tipo</dt>
                    <dd className="mt-1 text-sm text-gray-900">{report.type}</dd>
                  </div>
                )}
              </dl>
            </div>

            {report.summary && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Resumo</h3>
                <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {report.summary.period && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Período</dt>
                      <dd className="mt-1 text-sm text-gray-900">{report.summary.period}</dd>
                    </div>
                  )}
                  {report.summary.totalRevenue !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Receita Total</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        R$ {report.summary.totalRevenue.toLocaleString('pt-BR')}
                      </dd>
                    </div>
                  )}
                  {report.summary.totalExpenses !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Despesa Total</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        R$ {report.summary.totalExpenses.toLocaleString('pt-BR')}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <div className="flex justify-end space-x-3 border-t pt-4">
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Excluir
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}