import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path=''
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
