import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import ReportList from '../components/ReportList';
import ReportDetails from '../components/ReportDetails';

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

export default function Reports() {
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Mock data for demonstration
  const mockReports: Report[] = [
    {
      id: '1',
      title: 'Relatório Financeiro Janeiro 2024',
      uploadedAt: '2024-01-15',
      status: 'processed',
      fileSize: '2.5 MB',
      type: 'Relatório Mensal',
      summary: {
        period: 'Janeiro 2024',
        totalRevenue: 150000,
        totalExpenses: 120000,
      },
    },
    {
      id: '2',
      title: 'Análise de Custos Q1',
      uploadedAt: '2024-02-01',
      status: 'processing',
      fileSize: '1.8 MB',
      type: 'Análise Trimestral',
    },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        console.log('Parsed Excel data:', jsonData);
        setUploadStatus('Arquivo processado com sucesso!');
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      setUploadStatus('Erro ao processar arquivo');
      console.error('Error processing file:', error);
    }
  };

  const handleReportClick = (reportId: string) => {
    const report = mockReports.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
    }
  };

  const handleDeleteReport = (reportId: string) => {
    console.log(`Deletando relatório ${reportId}`);
    setSelectedReport(null);
    // Implement actual delete logic
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Relatórios Financeiros</h1>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Upload de Relatório</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload de arquivo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">XLSX, XLS até 10MB</p>
            </div>
          </div>
          {uploadStatus && (
            <p className={`mt-2 text-sm ${uploadStatus.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
              {uploadStatus}
            </p>
          )}
        </div>

        <ReportList reports={mockReports} onReportClick={handleReportClick} />
      </div>

      {selectedReport && (
        <ReportDetails
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onDelete={handleDeleteReport}
        />
      )}
    </div>
  );
}