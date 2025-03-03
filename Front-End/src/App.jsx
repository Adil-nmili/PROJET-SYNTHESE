import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layout/DashboardLayout'
import Admin from './pages/Dashboard/Admin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/admins" element={<Admin />} />
          <Route path="/dashboard/admins/new" element={<Admin />} />
          <Route path="/dashboard/products" element={<Admin />} />
          <Route path="/dashboard/products/new" element={<Admin />} />
          <Route path="/dashboard/users" element={<Admin />} />
          <Route path="/dashboard/orders" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
