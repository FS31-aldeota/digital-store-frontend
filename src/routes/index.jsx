import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Home from "../pages/Home";
import Login from "../components/Login";
import RecuperarSenha from "../EsqueciASenha";
import Cadastro from "../pages/Cadastro";
import MeusPedidos from "../pages/MeusPedidos";

export const Paths = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/meus-pedidos" element={<MeusPedidos />} />
                    <Route path="/cadastro-completo" element={<h1>FAZER CADASTRO</h1>} />

                    {/* <Route path="seu-caminho" element={seu componente } /> */}
                </Route>
                
                <Route path="/login" element={<Login/>} />
                <Route path="/recuperar" element={<RecuperarSenha/>}/>
            </Routes>
        </BrowserRouter>
    );
}