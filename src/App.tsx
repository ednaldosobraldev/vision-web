import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UsuariosAdmin from "./pages/usuarios-admin";
import EscolasPage from "./pages/escolas/index";
import TurmasPage from "./pages/turmas";
import PerfisPage from "./pages/perfis";
import UsuariosPage from "./pages/usuarios";
import ManuaisPage from "./pages/manuais";
import VideosPage from "./pages/videos";
import RelatoriosPage from "./pages/relatorios";
import ChatPage from "./pages/chat";
import DashBoard from "./pages/dashboard";
import ErrorPage from "./pages/error";
import CadUsuarios from "./pages/usuarios-admin/CadUsuarios";
import NiveisQuizPage from "./pages/niveisquiz";
import QuizPage from "./pages/quiz";
import SalasDesafioPage from "./pages/salasdesafio";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path="/usuarios-admin" element={<UsuariosAdmin />} />
             {/* <Route path="cad" element={<CadUsuarios idusuario={0}/>}/>*/}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/escolas" element={< EscolasPage />} />
          <Route path="/turmas" element={< TurmasPage />} />
          <Route path="/perfis" element={< PerfisPage />} />
          <Route path="/turmas" element={< TurmasPage />} />
          <Route path="/usuarios" element={< UsuariosPage />} />
          <Route path="/manuais" element={< ManuaisPage />} />
          <Route path="/videos" element={< VideosPage />} />
          <Route path="/relatorios" element={< RelatoriosPage />} />
          <Route path="/quiz" element={< QuizPage />} />
          <Route path="/niveisquiz" element={< NiveisQuizPage />} />
          <Route path="/salasdesafio" element={< SalasDesafioPage />} />
          <Route path="/chat" element={< ChatPage />} />
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
