import './App.css';
import LoginPage from "./log";
import Form from './FormValidator';
import Navbar from './navbar';
import Home from './Home';
import {Routes, Route} from 'react-router-dom'
import Services from './services';
import Contact from './contact';
import UserProfile from './UserProfile';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<UserProfile/>} />

      </Routes>
    </div>

  );
}

export default App;
