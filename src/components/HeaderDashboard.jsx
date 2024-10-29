import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const HeaderDashboardContainer = styled.header`

`;

const HeaderDashboard = () => {
    return (
        <HeaderDashboardContainer className="w-2 h-full bg-white">
            <nav className={'p-4'}>
                <ul className={'flex flex-col gap-3'}>
                    <li>
                        <NavLink className={'text-black'} to={'/dashboard'}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className={'text-black'} to={'/dashboard/usuarios'}>Usuários</NavLink>
                    </li>
                    <li>
                        <NavLink className={'text-black'} to={'/dashboard/marcas'}>Marcas</NavLink>
                    </li>
                    <li>
                        <NavLink className={'text-black'} to={'/dashboard/banners'}>Banners</NavLink>
                    </li>
                    <li>
                        <NavLink className={'text-black'} to={'/dashboard/categorias'}>Categorias</NavLink>
                    </li>
                    <li>
                        <NavLink className={'text-black'} to={'/dashboard/produtos'}>Produtos</NavLink>
                    </li>
                </ul>
            </nav>
        </HeaderDashboardContainer>
    );
}
 
export default HeaderDashboard;