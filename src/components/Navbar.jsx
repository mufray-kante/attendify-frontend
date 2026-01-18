import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#111', color: '#fff' }}>
      <Link to='/lecturer' style={{ marginRight: 20 }}>Lecturer</Link>
      <Link to='/student'>Student</Link>
    </nav>
  );
}
