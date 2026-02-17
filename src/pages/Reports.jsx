import { FileText, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
        <p className="text-gray-500 mt-1">Generate and export clinical data</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard title="Weekly Summary" date="Feb 10 - Feb 17" />
        <ReportCard title="AGP Report" date="Last 14 Days" />
        <ReportCard title="Device History" date="All Time" />
      </div>
    </div>
  );
}

function ReportCard({ title, date }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <FileText size={24} />
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Download size={20} />
        </button>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{date}</p>
    </div>
  )
}
