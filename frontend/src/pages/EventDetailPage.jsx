import { useParams } from 'react-router-dom';

export default function EventDetailPage() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-900">
      <div className="text-center p-8 bg-slate-800 rounded-xl border border-slate-700 shadow-xl max-w-lg w-full">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
          Event Detail — coming soon
        </h1>
        <p className="text-slate-400 mb-2">
          Details for event <span className="font-mono bg-slate-700 px-2 py-1 rounded text-slate-200">{id}</span> will be displayed here.
        </p>
      </div>
    </div>
  );
}
