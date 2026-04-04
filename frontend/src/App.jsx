import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-neon-green font-mono flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
