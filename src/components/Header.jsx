import styled from "styled-components";
import { default as But } from '../components/buttons/Buttons.jsx';
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/index.jsx";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 192px;
    width: 100%;
    height: 66.5px;
    margin: auto;

    @media (min-width: 768px) {
        height: 192px;
    }

    .container{
        background-color: var(--white);
        padding: 20px;
        display: flex;
        width: 100%;
        height: fit-content;
        flex-wrap: wrap;
        position: fixed;
        z-index: 10;

        @media (min-width: 768px) {
            padding: 45px 100px 29px 100px;
            flex-direction: column;
            justify-content: space-between;
            height: 192px;
            position: static;
            max-width: 100%;
        }
        
        .carrinho, .out-search, nav.links, .fundo, #menu-sidebar, #menu-sidebar + label, .digital-logo, .search-buy, .carrin{
            z-index: 4;
        }

        & .top-side{
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;

            & > .cadastre{
                display: none;
                a {
                    color: var(--dark-gray-2);
                    margin-left: 10px;
                }
                @media (min-width: 768px){
                    display: inline;
                }
            }

            & > .login {
                display: none;

                & a {
                    width: fit-content;
                    margin-right: 50px;

                    button {
                        width: 114px;
                    }
                }

                @media (min-width: 768px) {
                    display: inline;
                    margin-right: max(0, calc(100% -50px));
                }
            }
        }

        .fundo{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 66.5px;
            background-color: var(--white);

            @media (min-width: 768px) {
                display: none;
            }
        }

        .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 3;
        background-color: rgba(31, 31, 31, 0.4);
        opacity: 0;
        visibility: hidden;
        transition-duration: 500ms;
        }

        &:has(div #menu-sidebar:checked){
            .overlay {
                opacity: 1;
                visibility: visible;
            }
        }

        & #menu-sidebar {
            display: none;
            visibility: hidden;
            width: 0;
        }

        & label.menu-button {
            display: flex;
            width: 24px;
            height: 24px;

            & img {
                margin: 0;
                width: 24px;
                height: 24px;
            }

            @media (min-width: 768px) {
                display: none;
            }
        }

        &:has(#menu-sidebar:checked) .links{
            transform: translateX(0);
            opacity: 1;
        }
            
        & .links{
            z-index: 3;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 66.5px;
            left: 0px;
            background-color: var(--white);
            height: calc(100vh - 66.5px);
            width: 308px;
            padding: 30px;
            box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.1);
            transition: all 500ms;
            transform: translateX(-100%);
            opacity: 0;

            & p {
                color: var(--dark-gray-2);
                margin: 0;
            }

            & nav {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 20px;

                & a {
                    color: var(--dark-gray-3);
                    text-decoration: none;
                    width: fit-content;
    
                    &.active {
                        color: var(--primary);
                    }
    
                    &:not(.active)::after {
                        content: "";
                        display: block;
                        border-radius: 2px;
                        width: 0%;
                        height: 2px;
                        margin-top: 5px;
                        background-color: transparent;
                        transition-duration: 500ms;
                    }
    
                    &.active::after {
                        content: "";
                        display: block;
                        border-radius: 2px;
                        width: 100%;
                        height: 2px;
                        margin-block-start: 5px;
                        background-color: var(--primary);
                        transition-duration: 500ms;
                    }
                }
            }
    

            &::after{
                content: "";
                width: calc(100% - 60px);
                height: 1px;
                background-color: var(--light-gray-2);
                position: absolute;
                bottom: calc(30px + 85px + 20px);
            }

            & .but-link{
                margin-top: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 17px;


                & .login{
                    width: 100%;

                    & a{
                        width: inherit;
                        order: 1;
                        & button {
                            width: inherit;
                        }
                    } 
                }

                & .cadastre{
                    & a{
                        color: var(--dark-gray-2);
                    }
                    order: 2;
                }
            }

            @media (min-width: 768px) {
                z-index: 4;
                flex-direction: row;
                opacity: 1;
                visibility: visible;
                background-color: transparent;
                box-shadow: none;
                transform: none;
                position: static;
                height: auto;
                padding: 0;
                height: 29px;
                width: 424px;
                order: 4;

                p {
                    display: none;
                }

                nav {
                    flex-direction: row;
                    gap: 32px;
                    align-items: center;
                    height: 25px;
                    margin: 0;

                    & a {
                        color: var(--dark-gray-3);
                        text-decoration: none;
                        line-height: 25px;
                    }
                }

                &:after {
                    display: none;
                }

                .but-link {
                    display: none;
                }
            }
        }

        & .digital-logo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 138px;
            height: 24px;
            margin-left: 70px;
    
            & img {
                margin: 2.73px 0 3.27px 0;
                width: 18px;
                height: 18px;
    
                @media (min-width: 768px) {
                    margin-left: auto;
                    width: 33px;
                    height: 33px;
                    margin: 5px 0 6px 0;
                }
            }
    
            & h1 {
                margin: 0;
                width: auto;
                font-size: 19.85px;
                line-height: 24px;
                font-weight: 600;
                letter-spacing: -0.01rem;
                color: var(--primary);
    
                @media (min-width: 768px) {
                    font-size: 36px;
                    line-height: 44px;
                }
            }
            @media (min-width: 768px) {
                height: 44px;
                width: 253px;
                margin: 0;
            }
        }

        & .out-search{
            height: 20px;
            width: 20px;
            transition-duration: 500ms;
            margin-left: 28px;

            @media (min-width: 768px) {
                display: none;
            }

            & img{
                width: 20px;
                height: 20px;
            }
        }

        & #search-buy:checked + .out-search > img{
            filter: invert(20%) sepia(62%) saturate(3928%) hue-rotate(315deg) brightness(85%) contrast(91%);
        }

        & #search-buy{
            display: none;
        }

        & .search-buy {
            display: flex;
            position: absolute;
            top: -13.5px;
            left: 0;
            width: 100vw;
            height: 80px;
            justify-content: space-between;
            z-index: 1;
            transition-duration: 300ms;
            visibility: hidden;
            transform: translateY(0);

            & .MenuTopBarSearch{
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
                background-color: var(--white);
                justify-content: flex-end;
                padding: 0 40px 20px 20px;
                
                & input{
                    color: var(--dark-gray-3);
                    width: 100%;
                    height: 60px;
                    padding: 16px 20px;
                    border: 0;
                    border-radius: 8px;
                    background-color: rgba(71, 71, 71, 0.04);

                    &::placeholder{
                        color: var(--dark-gray-3);
                    }

                    &:focus{
                        outline: none;
                    }
                }

                & a{
                    position: absolute;
                    margin-right: 20px;
                    height: 24px;
                    cursor: pointer;
                    justify-content: flex-end;

                    & img{
                        opacity: 0.5;
                    }
                }
            }

            @media (min-width: 768px) {
                width: min(559px, 47%);
                position: static;
                visibility: visible;
                height: fit-content;

                & .MenuTopBarSearch{
                    padding: 0;
                    height: fit-content;
                }
            }
            
        }

        & #search-buy:checked + * + .search-buy{
            transform: translateY(80px);
            visibility: visible;
        }
        

        & .carrin{
            position: relative;

            .carrin-but{
                position: relative;
    
                @media (min-width: 768px){
                    
                }
    
                & #carrinho {
                    display: none;
                }
    
                & label img{
                    cursor: pointer;
                }
    
                & .p-badge{
                    clip-path: circle(8.5px at center);
                    display: flex;
                    position: absolute;
                    top: -5px;
                    right: -11px;
                    background-color: var(--error);
                    height: 17px;
                    width: 17px;
                    color: var(--white);
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
            }

            &:has(.carrin-but #carrinho:checked) .dropdown-carrin{
                visibility: visible;
                opacity: 1;
            }

            & .dropdown-carrin {
                background-color: var(--white);
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                position: absolute;
                padding: 30px;
                right: 0px;
                width: 315px;
                height: 454px;
                border-radius: 4px;
                transition-duration: 300ms;
                visibility: hidden;
                opacity: 0;

                & > p{
                    color: var(--dark-gray-2);
                    margin: 0;
                }

                & .prods {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;

                    & .wrapper{
                        width: 255px;
                        height: 93px;
                        background-color: transparent;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        & img{
                            width: 71px;
                            height: 71px;
                        }
                        
                        & .info {
                            display: flex;
                            justify-content: space-between;
                            flex-direction: column;
                            width: 150px;

                            & .descricao {
                                font-family: "Inter";
                                font-size: 14px;
                                font-weight: 700;
                                line-height: 20px;
                                letter-spacing: 0.75px;
                                text-align: left;
                                margin: 0;
                                color: var(--dark-gray);
                            }

                            & .valores {
                                display: flex;
                                align-items: center;
                                flex-direction: row;
                                justify-content: space-around;

                                & p{
                                    margin: 0;
                                }

                                & .descontado{
                                    color: var(--dark-gray-2);
                                }
                                & .valor {
                                    font-family: Inter;
                                    font-size: 12px;
                                    font-weight: 400;
                                    line-height: 28px;
                                    letter-spacing: 0.75px;
                                    text-align: center;
                                    color: var(--light-gray-2);
                                    text-decoration: line-through;
                                }
                            }
                        }
                    }

                    &::before{
                        content: "";
                        width: 100%;
                        height: 1px;
                        background-color: var(--light-gray-2);
                        bottom: calc(30px + 85px + 20px);
                        margin-top: 10px
                    }
                    &::after{
                        content: "";
                        width: 100%;
                        height: 1px;
                        background-color: var(--light-gray-2);
                        margin-bottom: 20px
                    }

                }

                & .down{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 84px;

                    & .total{
                        display: flex;
                        justify-content: space-between;
                        height: auto;

                        & p{
                            margin: 0;
                        }

                        & .valor{
                            color: var(--dark-gray-2);
                        }

                        & .num-valor{
                            color: var(--dark-gray-2);
                        }
                    }

                    & .ab{
                        display: flex;
                        justify-content: space-between;

                        & .esvaziar {
                            color: var(--dark-gray-2);
                        }
                    }
                }
            }
        }
    }
`;

const DigitalLogo = () => {
    return (
        <div className="digital-logo">
            <img src="Group.svg" />
            <h1>Digital Store</h1>
        </div>
    );
}

const Usuario = () => {
    const { usuario } = useContext(AuthContext);
    return (
        <>
            {
                usuario ? (
                    <div className="text-black">{usuario.usuario_nome}</div>
                ) : (
                    <>
                        <div className="cadastre">
                            <Link className="text-small" to="/cadastro" >Cadastre-se</Link>
                        </div>
                        <div className="login">
                            <Link to="/login" >
                                <But
                                    className={"text-extra-small bold"}
                                    buttonType="primary-button"
                                    label={"Entrar"}
                                />
                            </Link>
                        </div>
                    </>
                )
            }
        </>
    )
}

const Links = () => {
    return (
        <div className="links">
            <p className="text-small bold">Páginas</p>

            <nav>
                <NavLink to="/" className={(a) => `${whereNavLink(a)} text-small`} >Home</NavLink>
                <NavLink to="/produtos" className={(a) => `${whereNavLink(a)} text-small`} >Produtos</NavLink>
                <NavLink to="/categorias" className={(a) => `${whereNavLink(a)} text-small`} >Categorias</NavLink>
                <NavLink to="/meu-perfil" className={(a) => `${whereNavLink(a)} text-small`} >Meus Pedidos</NavLink>
            </nav>
            <div className="but-link">
                <Usuario />
            </div>

        </div>
    )
}

const whereNavLink = ({ isActive, isPending }) => {
    if (isPending) {
        return "pending"
    } else if (isActive) {
        return "active"
    } else {
        return ""
    }
};

const Carrin = () => {
    return (
        <div className="carrin">
            <div className="carrin-but">
                <input type="checkbox" id="carrinho" />
                <label htmlFor="carrinho">
                    <img src="Buy.svg" />
                </label>
                <label className="p-badge" htmlFor="carrinho">2</label>
            </div>
            <div className="dropdown-carrin">
                <p className="text-small bold">Meu Carrinho</p>
                <div className="prods">
                    <div className="wrapper">
                        <img src="Batata.png" alt="" />
                        <div className="info">
                            <p className="descricao title-small bold">
                                Batata premium
                            </p>
                            <div className="valores">
                                <p className="descontado text-small bold">
                                    R$ 10,00
                                </p>
                                <p className="valor text-extra-small">
                                    R$ 19,00
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <img src="Batata.png" alt="" />
                        <div className="info">
                            <p className="descricao title-small bold">
                                Batata Premium
                            </p>
                            <div className="valores">
                                <p className="descontado text-small bold">
                                    R$ 10,00
                                </p>
                                <p className="valor text-extra-small">
                                    R$ 19,00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="down">
                    <div className="total">
                        <p className="valor text-small bold">Valor Total:</p>
                        <p className="num-valor text-small bold">R$50,00</p>
                    </div>
                    <div className="ab">
                        <Link className="text-small esvaziar" to="/" >Esvaziar</Link>
                        <Link to='/meu-carrinho'>
                            <But className={"text-small bold ver-carrin-maior"} label={"Ver Carrinho"} buttonType="primary-button"></But>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

const Header = () => {

    return (
        <HeaderContainer>
            <div className="container">
                <div className="top-side">

                    <div className="fundo"></div>

                    <label className="overlay" htmlFor="menu-sidebar"></label>
                    <input type="checkbox" id="menu-sidebar" />
                    <label className="menu-button" htmlFor="menu-sidebar">
                        <img src="Menu.svg" />
                    </label>
                    <DigitalLogo />

                    <input type="checkbox" id="search-buy" />
                    <label className="out-search" htmlFor="search-buy">
                        <img src="Search.svg" />
                    </label>

                    <div className="search-buy">
                        <div className="MenuTopBarSearch">
                            <input type="text" className="text-small" placeholder="Pesquisar produto..." />
                            <Link to="/produtos">
                                <img src="Search.svg" />
                            </Link>
                        </div>
                    </div>
                    <Usuario />

                    <Carrin />
                </div>

                <Links />
            </div>
        </HeaderContainer>
    );
};

export default Header;