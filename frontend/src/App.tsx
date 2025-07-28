import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components';
import { CreateNotePage, NoteDetailPage, NotesActivePage, NotesArchivedPage, NotFoundPage } from './pages';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<NotesActivePage />} />
          <Route path="/notes/active" element={<NotesActivePage />} />
          <Route path="/notes/archived" element={<NotesArchivedPage />} />
          <Route path="/notes/new" element={<CreateNotePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;