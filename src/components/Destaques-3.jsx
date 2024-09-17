import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Skeleton } from "primereact/skeleton";

const Highlights3WrapperContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 80px;
  margin-bottom: 40px;
  overflow-x: hidden;
  width: calc(100% - 10.66%);

  @media (min-width: 768px) {
    width: calc(100% - 13.88%);
    margin-bottom: 120px;
  }

  & .colecoes {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .colecoes-dest {
      color: var(--dark-gray-2);
    }

    & a {
      height: 24px;
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      color: var(--primary);
      gap: 8px;

      @media (min-width: 768px) {
        height: 34px;
      }

      & .writed {
        text-align: center;
      }

      & .pi-arrow-right {
        display: flex;
        align-items: center;

        &::before {
          font-size: 17.75px;
          height: 22px;

          @media (min-width: 768px) {
            display: flex;
            align-self: start;
          }
        }
      }
    }
  }

  & .cards {
    display: grid;
    gap: 40px 9px;
    grid-template-columns: repeat(auto-fit, 163px);
    grid-template-rows: repeat(auto-fit, 264px);
    grid-auto-rows: 264px;

    @media (min-width: 768px) {
      column-gap: 0;
      grid-template-columns: repeat(auto-fit, 292px);
      grid-template-rows: repeat(auto-fit, 439px);
      grid-auto-rows: 439px;
      justify-content: space-between;
    }

    & .card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;

      & .img-disc {
        display: flex;
        position: relative;
        height: 179px;
        width: 100%;
        background-color: var(--white);
        text-decoration: none;

        @media (min-width: 768px) {
          height: 371px;
        }

        & .discount {
          display: flex;
          align-items: center;
          position: absolute;
          justify-content: space-evenly;
          width: 88px;
          height: 32px;
          border-radius: 29px;
          color: var(--dark-gray-2);
          padding: 4px 11px;
          background-color: #e7ff86;
          left: 13px;
          top: 14px;

          @media (min-width: 768px) {
            top: 20px;
            left: 20px;
          }
        }

        & img {
          width: 90%;
        }
      }

      & .texts {
        display: flex;
        flex-direction: column;
        align-items: left;

        & .prod-type {
          color: var(--light-gray);
          width: fit-content;
          text-decoration: none;
        }

        & .prod-name {
          color: var(--dark-gray-2);
          width: 149px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-decoration: none;

          @media (min-width: 768px) {
            width: unset;
          }
        }

        & .prices {
          display: flex;
          width: fit-content;
          gap: 8px;
          text-decoration: none;

          & .origin-price {
            color: var(--light-gray);
            text-decoration: line-through;
          }

          & .now-price {
            color: var(--dark-gray);
          }
        }
      }
    }
  }
`;

const Card = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get("http://localhost:3000/sapatos");
      setData(response.data);
    };

    fecthData();
  }, []);

  const estiloDoSkeleton = "bg-light-gray-2 after:bg-gradient-to-r after:from-[rgba(245,245,245,0)] after:via-light-gray-3 after:via-50% after:to-[rgba(245,245,245,0)]"

  return data ? (
    <div className="card">
      <Link to="/produtos" className="img-disc">
        {data[0].sapato_discount > 0 && (
          <div className="discount">
            <p className="percentage text-tinny bold">
              {data[0].sapato_discount}%
            </p>
            <p className="text-tinny bold">OFF</p>
          </div>
        )}

        <img src={data[0].sapato_image} />
      </Link>

      <div className="texts">
        <Link to="/produtos" className="prod-type text-tinny bold">
          {data[0].sapato_type}
        </Link>
        <Link
          to="/produtos"
          className={`prod-name ${
            window.innerWidth >= 768 ? "text-large" : "text-extra-small"
          } `}
        >
          {data[0].sapato_name}
        </Link>
        <Link to="/produtos" className="prices">
          <p
            className={`origin-price ${
              window.innerWidth >= 768 ? "text-large" : "text-extra-small"
            } `}
          >
            ${data[0].sapato_value}
          </p>
          <p
            className={`now-price ${
              window.innerWidth >= 768 ? "text-large" : "text-extra-small"
            } bold`}
          >
            ${(data[0].sapato_value * data[0].sapato_discount) / 100}
          </p>
        </Link>
      </div>
    </div>
  ) : (
    <>
      <div className="bg-white rounded-2xl p-3">
        <Skeleton height="321px" width="100%" className={estiloDoSkeleton}></Skeleton>
        <Skeleton height="8px" width="40px" className={estiloDoSkeleton + " mt-4"}></Skeleton>
        <Skeleton height="22px" className={estiloDoSkeleton + " mt-1"}></Skeleton>
        <Skeleton height="15px" width="100px" className={estiloDoSkeleton + " mt-1"}></Skeleton>
      </div>
    </>
  );
};

const Destaques3 = () => {
  return (
    <Highlights3WrapperContainer>
      <div className="colecoes">
        <h3
          className={`colecoes-dest bold ${
            window.innerWidth >= 768 ? "text-large" : "text-small"
          }`}
        >
          Produtos em alta
        </h3>
        <Link
          to="/produtos"
          className={
            window.innerWidth >= 768 ? "text-medium" : "text-extra-small"
          }
        >
          <p className="writed">Ver todos</p>
          <p className="pi-arrow-right"></p>
        </Link>
      </div>
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Highlights3WrapperContainer>
  );
};

export default Destaques3;
