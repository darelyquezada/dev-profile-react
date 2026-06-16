import { HashRouter, Routes, Route } from 'react-router-dom';
import { CVProvider } from './context/CVContext';
import Navbar    from './components/Navbar';
import Home      from './pages/Home';
import Editor    from './pages/Editor';
import Preview   from './pages/Preview';
import Dashboard from './pages/Dashboard';
import About     from './pages/About';
import './styles/global.css';

export default function App() {
  return (
    <CVProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />}      />
          <Route path="/editor"    element={<Editor />}    />
          <Route path="/preview"   element={<Preview />}   />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about"     element={<About />}     />
        </Routes>
      </HashRouter>
    </CVProvider>
  );
}