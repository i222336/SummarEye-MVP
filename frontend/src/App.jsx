import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
