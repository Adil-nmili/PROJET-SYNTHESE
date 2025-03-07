import './App.css'
import DashboardLayout from './layout/DashboardLayout'
import Admin from './pages/Dashboard/Admin';
import Login from './pages/Dashboard/Login';
import DetailUtilisateur from './pages/Dashboard/DetailUtilisateur';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/admins" element={<Admin />} />
          <Route path="/dashboard/admins/new" element={<Admin />} />
          <Route path="/dashboard/products" element={<Admin />} />
          <Route path="/dashboard/products/new" element={<Admin />} />
          <Route path="/dashboard/users" element={<DetailUtilisateur />} />
          <Route path="/dashboard/orders" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
