import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LecturerDashboard from './pages/LecturerDashboard';
import StudentAttendance from './pages/StudentAttendance';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/lecturer' element={<LecturerDashboard />} />
        <Route path='/student' element={<StudentAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}
