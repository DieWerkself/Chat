import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, Main, PageNotFound } from './components';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
