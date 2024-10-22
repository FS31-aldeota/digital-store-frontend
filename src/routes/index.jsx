import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home";
import Login from "../components/Login";
import RecuperarSenha from "../EsqueciASenha";
import Cadastro from "../pages/Cadastro";
import Produtos from "../components/Produtos";
import CadastroCompleto from "../pages/CadastroCompleto";
import ProfileLayout from "../layouts/ProfileLayout";
import MeusPedidos from "../components/MeusPedidos";
import MinhasInformacoes from "../components/MinhasInformacoes";
import MetodosPagamentos from "../components/MetodosPagamentos";
import CompraRealizada from "../pages/CompraRealizada";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import DashboardMarcas from "../pages/DashboardMarcas";
import Categorias from "../pages/Categorias";
import FinalizarCompra from "../pages/FinalizarCompra.jsx";
import MeuCarrinho from "../components/MeuCarrinho.jsx";
import Produto from "../components/Produto";
import NotFound from "../pages/NotFound.jsx";
import DashboardBanners from "../pages/DashboardBanners";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashboardCategorias from "../pages/DashboardCategorias";

export const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/compra-realizada" element={<CompraRealizada />} />
                    <Route path="/meu-carrinho" element={<MeuCarrinho/>}/>

                    <Route path="/meu-perfil" element={<ProfileLayout />}>
                        <Route index element={<MeusPedidos />} />
                        <Route path="/meu-perfil/minhas-informacoes" element={<MinhasInformacoes />} />
                        <Route path="/meu-perfil/metodos-de-pagamentos" element={<MetodosPagamentos />} />
                    </Route>

                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/produto" element={<Produto />}/>
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/meus-pedidos" element={<MeusPedidos />} />
                    <Route path="/finalizar-compra" element={<FinalizarCompra />} />
                </Route>
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="/dashboard/marcas" element={<DashboardMarcas />} />
                    <Route path="/dashboard/banners" element={<DashboardBanners />} />
                    <Route path="/dashboard/categorias" element={<DashboardCategorias />} />
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro-completo" element={<CadastroCompleto/>} />
                <Route path="/recuperar" element={<RecuperarSenha/>}/>
                <Route path="*" element={<NotFound />} /> 
            </Routes>
        </BrowserRouter>
    );
}

const ProtectedRoute = ({ children}) => {
    const { usuario } = useContext(AuthContext);
    return usuario ? children : <Navigate to={'/'} />;
}