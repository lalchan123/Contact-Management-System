import './App.css';
import { Route, Routes } from "react-router-dom"
import SignIn from './Component/Authentication/SignIn';
import SignUp from './Component/Authentication/SignUp';


import { Toaster, toast } from 'react-hot-toast';
import Contact from './pages/Contact/Contact';
import AddContact from './pages/Contact/AddContact';
import EditContact from './pages/Contact/EditContact';
import ViewContact from './pages/Contact/ViewContact';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Contact />} />
        <Route path="/addContact" element={<AddContact />} />
        <Route path="/viewContact/:id" element={<ViewContact />} />
        <Route path="/editContact/:id" element={<EditContact />} />
      </Routes>      
      <Toaster className="mt-6" position="top-center" toastOptions={{ className: "", duration: 4000, style: { background: "#152b2c", color: "#fff", }, success: {   duration: 3500, theme: { primary: "green", secondary: "black" } } }} />
    </div>
    
  );
}

export default App;
