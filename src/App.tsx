import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UsuariosAdmin from "./pages/usuarios-admin";
import PerfisPage from "./pages/perfis";
import DashBoard from "./pages/dashboard";
import ErrorPage from "./pages/error";
import CadUsuarios from "./pages/usuarios-admin/CadUsuarios";
import EmpresasPage from "./pages/empresas/index";
import InicioPage from "./pages/inicioPage";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InicioPage />}>
          <Route path="/usuarios-admin" element={<UsuariosAdmin />} />
             {/* <Route path="cad" element={<CadUsuarios idusuario={0}/>}/>*/}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/perfis" element={< PerfisPage />} />
          <Route path="/empresas" element={< EmpresasPage />} />
          {/*<Route
            path="/dashboard"
            element={
              // Use um componente de navegação condicional para redirecionar
              // o usuário se não estiver autenticado
              localStorage.getItem('isLoggedIn') ? (
                <DashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />*/}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        {/*<Route path="*" element={<ErrorPage />} />*/}
       
        {/* Defina uma rota padrão ou de redirecionamento */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
