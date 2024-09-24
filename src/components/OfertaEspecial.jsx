import { styled } from "styled-components";
import img from "../assets/oferta-especial.png";

const OfertaEspecialContainer = styled.div`
    width: 100%;
    & .oferta-especial{
        height: 553px;
        display: flex;
        gap: 67px;
        align-items: center;
        justify-content: center;
        margin-top: 40.34px;
    }

    & .imagem{
        position: relative;
        flex: 1;
    }

    & .imagem img{
        width: 573px;
        height: 330px;
    }

    & .imagem .contorno{
        position: absolute;
        background: linear-gradient(180deg, rgba(66, 0, 255, 0.25) -40.67%, rgba(255, 255, 255, 0) 100%);
        border-radius: 100%;
        width: 466px;
        height: 466px;
        z-index: -1;
        left: 64px;
        top: -40px;
    }

    & .offer{
        flex: 1;
        height: 290px;
    }

    & .offer p{
        color: rgba(71, 71, 71, 1);
        line-height: 28px;
        size: 16px;
        width: 589px;
        height: 112px;
        letter-spacing: 0.75px;
    }

    & .offer h4{
        color: rgba(201, 32, 113, 1);
        line-height: 22px;
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 10px;
    }

    & .offer h1{
        color: rgba(71, 71, 71, 1);
        line-height: 50px;
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 1px;
        padding-bottom: 10px;
    }

    & .botao button{
        background-color: rgba(201, 32, 113, 1);
        border-radius: 5px;
        width: 200px;
        height: 40px;
        /* left: 692px;
        top: 3144px; */
        margin-top: 30px;
        color: white;
        border: 0;
        font-size: 14px;
        transition-duration: 200ms;
        &:hover{
            background-color: #991956;
        }
    }

    @media only screen and ( max-width: 640px ){
        width: 100%;
        & .oferta-especial{
            flex-direction: column;
            height: auto;
        }
        & .imagem img{
            width: 300px;
            height: auto;
        }
        & .imagem .contorno{
            width: 300px;
            height: 300px;
            left: calc(50% - 150px);
        }
        & .offer{
            padding: 0 20px;
            height: auto;
        }
        & .offer p{
            width: auto;
            height: auto;
        }
    }

`;

const OfertaEspecial = () => {
    return (
        <OfertaEspecialContainer>
            <div className="oferta-especial">
                <div className="imagem">
                    <div className="contorno"></div>
                    <img src={img} alt="" />
                </div>

                <div className="offer">
                    <h4>Oferta Especial</h4>

                    <h1>Air Jordan edição de colecionador</h1>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                        perferendis ab hic, totam placeat eligendi id voluptates, consequatur
                        ipsum porro aspernatur, ducimus ratione fuga necessitatibus eius
                        dolorem et. Atque, quod!
                    </p>
                    <div className="botao">
                        <button>Ver Oferta</button>
                    </div>
                </div>

            </div>
        </OfertaEspecialContainer>
    );
}

export default OfertaEspecial;