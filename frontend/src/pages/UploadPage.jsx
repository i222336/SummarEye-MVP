import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-900">
      <div className="w-full max-w-2xl p-8 bg-slate-800 rounded-xl shadow-lg border border-slate-700 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-blue-300 mb-6">
          Upload your footage here
        </h1>
        <p className="text-slate-400 mb-8">
          Upload a local video file for AI event analysis.
        </p>
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/50 hover:border-indigo-400 transition-all duration-300 group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-slate-400 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-slate-400 group-hover:text-white transition-colors">
              {file ? <span className="font-semibold text-indigo-300">{file.name}</span> : <><span className="font-semibold">Click to upload</span> or drag and drop</>}
            </p>
            <p className="text-xs text-slate-500">MP4, AVI, or MKV</p>
          </div>
          <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
        </label>
        {file && (
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-colors" onClick={() => alert('Backend upload endpoint coming soon! File selected: ' + file.name)}>
              Process Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
