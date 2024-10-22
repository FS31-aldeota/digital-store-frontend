import PropTypes from "prop-types"
import styled from "styled-components";
import { default as But } from "./buttons/Buttons.jsx";
import { useEffect, useRef, useState } from "react";
import { useGetBanners } from "../hooks/bannerHooks.js";
import { Link } from "react-router-dom";

const BannersBigWraperContainer = styled.div`
    overflow: hidden;
    background-color: var(--light-gray-3);
    width: 100%;
    height: 662px;
    display: flex;
    position: relative;
    flex-direction: column;
    z-index: 0;

    @media (min-width: 768px) {
        height: 681px;
    }

    & .banners-wrapper {
        width: inherit;
        height: 616px;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        overflow-x: hidden;
        position: absolute;

        @media (min-width: 768px) {
            height: 622px;
        }
    }

    & .banners-links{
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-self: center;
        width: 78px;
        padding: 0;
        margin: 0;
        position: absolute;
        bottom: 34px;

        @media (min-width: 768px) {

        }

        & li{
            display: flex;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            transition: background-color ease 300ms;
            background-color: var(--light-gray-2);

            &:hover {
                background-color: #007bffaa;

            }

            &.active {
                background-color: var(--primary);
            }
        }
    }
`

const Banner1Container = styled.div`
    display: flex;
    position: relative;
    float: left;
    flex-direction: column;
    scroll-snap-align: start;
    overflow-y: hidden;
    flex: 1 0 100%;

    & .sapato{
        width: calc(100% - 5px - 43px);
        height: fit-content;
        order: -1;
        margin: 12px 43px 0 5px;

        @media (min-width: 768px) {
            position: absolute;
            margin: 0;
            right: 91px;
            top: 10px;
            width: min(62%, 886px);
            object-fit: scale-down;
        }
    }

    & .pirilampos{
        position: absolute;
        top: 20px;
        right: 0;
        transform: translateX(50%);
        clip-path: rect(0 50% 100% 0);

        @media (min-width: 768px) {
            top: 78px;
            right: 37px;
            transform: none;
        }
    }
    
    & .propag{
        display: flex;
        flex-direction: column;
        text-align: center;
        color: black;
        justify-content: start;
        width: calc(100vw - 40px);
        overflow-wrap: normal;
        margin: 0 20px;
        order: 1;

        @media (min-width: 768px) {
            width: 510px;
            height: 352px;
            text-align: start;
            margin: 124px 0 0 100px;
        }

        & h4{
            margin: 0;
            color: var(--primary);

            @media (min-width: 768px) {
                color: var(--warning)
            }
        }

        & h2 {
            color: var(--dark-gray);
            font-family: "Inter";
            font-weight: 800px;
            font-size: 40px;
            line-height: 50px;
            letter-spacing: 1px;
            margin: 10px 0 20px 0;

            @media (min-width: 768px) {
                font-size: 64px;
                line-height: 66px;
                margin: 20px 0;
            }
        }

        & p{
            margin: 0;
            color: var(--dark-gray-2);
        }

        & button{
            height: 48px;
            width: 100%;
            margin-top: 40px;

            @media (min-width: 768px) {
                width: 220px;
            }
        }
    }
`;

const Banner = (props) => {

    return (
        <Banner1Container id={props.banner_id}>
            <div className="propag">
                <h4 className="text-small bold">{props.banner_subtitulo}</h4>
                <h2>{props.banner_titulo}</h2>
                <p className={window.innerWidth <= 768 ? "text-extra-small" : "text-medium"}>{props.textinho}</p>
                <Link to={props.banner_link} target="_blank">
                    <But buttonType="primary-button" label="Clique Aqui" className={"text-small bold"} />
                </Link>
            </div>
            <img className="sapato" src={`https://digital-store-backend-c4an.onrender.com/files/${props.banner_imagem}`} />
        </Banner1Container>
    );
}

Banner.propTypes = {
    id: PropTypes.string.isRequired,
    textinho: PropTypes.string
}

const Banners = () => {
    const [activeBannerIndex, setActiveBannerIndex] = useState(0);
    const bannersWrapperRef = useRef(null);
    const intervalRef = useRef(null);

    const { data: banners, isFetched } = useGetBanners();

    // Handle click on banner. This function is triggered when a user clicks on a banner.
    const handleBannerClick = (index) => {
        setActiveBannerIndex(index);

        bannersWrapperRef.current.scrollTo({
            left: index * window.innerWidth,
            behavior: 'auto',
        });

        // Clear the interval when the component unmounts to restart the auto slide.
        clearInterval(intervalRef.current);
        autoSlide();
    };

    // Automatically switch to the next banner every 3 seconds.
    const autoSlide = () => intervalRef.current = setInterval(() => {
        setActiveBannerIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

    // Reload the auto slide.
    const reloadAutoSlide = () => clearInterval(intervalRef.current);

    // Start the auto slide when the component mounts. Stop it when the component unmounts.
    useEffect(() => {
        autoSlide();

        return () => {
            reloadAutoSlide();
        }
    }, []);

    // This makes sure the banners wrapper scrolls to the active banner when the active banner index changes.
    useEffect(() => {
        bannersWrapperRef.current.scrollTo({
            left: activeBannerIndex * window.innerWidth,
            behavior: 'auto',
        });
    }, [activeBannerIndex]);

    return (
        <BannersBigWraperContainer>

            <div className="banners-wrapper" ref={bannersWrapperRef}>
                {
                    isFetched && banners.map(banner => (
                        <Banner {...banner} />
                    ))
                }
            </div>

            <ul className="banners-links">
                {isFetched && banners.map((index) => (
                    <li key={index} onClick={() => { handleBannerClick(index - 1) }} className={index === activeBannerIndex + 1 ? 'active' : ''} />
                ))}
            </ul>

        </BannersBigWraperContainer>
    );
}

export default Banners;