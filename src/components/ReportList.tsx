import { DocumentTextIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Report {
  id: string;
  title: string;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'error';
}

interface ReportListProps {
  reports: Report[];
  onReportClick: (reportId: string) => void;
}

export default function ReportList({ reports, onReportClick }: ReportListProps) {
  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'processed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Relatórios Recentes</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => onReportClick(report.id)}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(report.uploadedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            {getStatusIcon(report.status)}
          </div>
        ))}
      </div>
    </div>
  );
}