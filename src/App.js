import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RegistrationForm from './RegisterAstrologerPage';
import background2 from './images/background2.jpg';
import AstrologersList from './AstrologersList';


function App() {
  return (
    <Router>
      <div className="background-container" style={{ backgroundImage: `url(${background2})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Routes>          
          <Route path="/registration" element={<RegistrationForm  />} />
          <Route path="/" element={<AstrologersList/>} />
        </Routes>
        
      <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
