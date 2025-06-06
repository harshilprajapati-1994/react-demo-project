
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import Login from './components/Login';
import Protected from './components/Protected'
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
      <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={
                <Protected>
                  <Dashboard />
                </Protected>
              } />
               <Route path="*" element={<Navigate to="/login" replace />} />
              
            </Routes>
          </BrowserRouter>
      </AuthContextProvider>
    </>
  )
}

export default App;