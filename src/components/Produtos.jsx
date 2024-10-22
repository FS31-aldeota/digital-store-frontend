import { useEffect, useState } from "react";
import Filtro from "../assets/Filtro.svg";
import SairMenu from "../assets/SairMenuLateral.svg";
import axios from "axios";
import { useGetMarcas } from "../hooks/marcaHooks";
import { useGetCategorias } from "../hooks/categoriaHooks";

const Produtos = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [filtros, setFiltros] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const { data: marcas, isFetched: isFetchedMarcas } = useGetMarcas();
  const { data: categorias, isFetched: isFetchedCategorias } = useGetCategorias();
  let totalProduto = produtos.length;

  const handleMenuClick = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const fecharMenu = () => {
    setMostrarMenu(false);
  };

  const menu = () => {
    return (
      <div className="w-full h-screen bg-white flex overflow-auto absolute top-0 left-0 z-50 shadow-lg flex-col">
        <div className="h-20 w-full px-[30px] mb-[20px] ">
          <div className="flex justify-between items-center border-b-2 border-light-gray-2 h-14">
            <h2 className="text-dark-gray-2 font-bold text-2xl">
              Filtrar por{" "}
            </h2>
            <button onClick={fecharMenu}>
              <img className=" h-5 w-5" src={SairMenu} alt="icone de sair" />
            </button>
          </div>
        </div>

        <div className="flex flex-col p-10 gap-12">
          <div className="flex flex-col gap-4">
            <label className="font-bold text-xl text-dark-gray-2">Marka</label>
            {
              marcas.map(marca => (
                <div className="flex items-center gap-[10px]">
                  <input
                    className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                    type="checkbox"
                  />
                  <label className="text-dark-gray-2 text-lg">{marca.marca_nome}</label>
                </div>
              ))
            }
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-bold text-xl text-dark-gray-2">
              Cathegoria
            </label>
            <div className="flex items-center gap-[10px]">
              <input
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                type="checkbox"
              />
              <label className="text-dark-gray-2 text-lg">Tenis</label>
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                type="checkbox"
              />
              <label className="text-dark-gray-2 text-lg">Sapato</label>
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                type="checkbox"
              />
              <label className="text-dark-gray-2 text-lg">
                Vestimenta de pe
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-bold text-xl text-dark-gray-2">Genero</label>
            <div className="flex items-center gap-[10px]">
              <input
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                type="checkbox"
              />
              <label className="text-dark-gray-2 text-lg">Maculiono</label>
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                type="checkbox"
              />
              <label className="text-dark-gray-2 text-lg">Feminiono</label>
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                type="checkbox"
              />
              <label className="text-dark-gray-2 text-lg">Unisexx</label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-bold text-xl text-dark-gray-2">Genero</label>
            <div className="flex items-center gap-[10px]">
              <input className="h-[20px] w-[20px]" type="radio" name="estado" />
              <label className="text-dark-gray-2 text-lg">Novo</label>
            </div>
            <div className="flex items-center gap-[10px]">
              <input className="h-[20px] w-[20px]" type="radio" name="estado" />
              <label className="text-dark-gray-2 text-lg">Usado</label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const buscarProdutos = async () => {
    const response = await axios.get("http://localhost:3000/produtos");
    setProdutos(response.data);
  };

  const filtrosSelecionados = (opcao) => {
    if(filtros.includes(opcao)){
      setFiltros([...filtros.filter(item => item != opcao)]);
      return;
    }
    setFiltros([...filtros, opcao]);
  }

  const filtrarProdutos = () => {
    if(filtros.length == 0){
      console.log("teste", produtos);
      setProdutosFiltrados([...produtos]);
    } else {
      setProdutosFiltrados([...produtos.filter(produto => filtros.includes(produto.marca) && filtros.includes(produto.categoria))]);
    }
  }

  useEffect(() => {
    buscarProdutos();
    filtrarProdutos();
  }, []);

  useEffect(() => {
    filtrarProdutos();
  }, [filtros, isFetchedMarcas]);

  console.log("Filtros: ", filtros);
  console.log("Produtos: ", produtosFiltrados);

  return (
    <div className="bg-light-gray-3 flex flex-wrap p-4">
      {/* Breadcrumbs e filter */}
      <div className="w-12 md:flex md:flex-row-reverse justify-between gap-5 mb-4 md:items-center">
        <div className="flex flex-row justify-between items-center gap-2  md:justify-end md:mr-16">
          <select
            className="w-[600px] md:w-[300px] md:mr-8 h-14 rounded-sm border border-gray-600 "
            name="Ordernar por: "
            id=""
          >
            <option value={"#"} disabled selected>
              Ordernar por
            </option>
            <option value={1}>mais relevante</option>
            <option value={2}>por menor preço</option>
            <option value={3}>por maior preço</option>
          </select>
          <button className="md:hidden w-24 h-24" onClick={handleMenuClick}>
            <img src={Filtro} />
          </button>
        </div>
        <div className="md:ml-28">
          <span>{`Resultado para "Tenis - ${totalProduto} produtos`}</span>
        </div>

      </div>

      <div className="flex flex-row gap-[56] md:gap-[28px] md:mx-[100px] ">
        {/* filtros */}
        <div className="hidden md:block md:bg-white md:w-[300px]">
          <div className="h-20 w-full p-10 mb-8 ">
            <div className="flex justify-between items-center border-b-2 border-light-gray-2 h-14">
              <h2 className="text-dark-gray-2 font-bold text-2xl">
                Filtrar por{" "}
              </h2>
            </div>
          </div>

          <div className="flex flex-col p-10 gap-12">
            <div className="flex flex-col gap-4">
              <label className="font-bold text-xl text-dark-gray-2">
                Marka
              </label>
              {
                isFetchedMarcas && marcas.map(marca => (
                  <div key={`m${marca.marca_id}`} className="flex items-center gap-[10px]">
                    <input
                      className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                      type="checkbox"
                      onClick={() => filtrosSelecionados(marca.marca_nome)}
                    />
                    <label className="text-dark-gray-2 text-lg">{marca.marca_nome}</label>
                  </div>
                ))
              }
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-bold text-xl text-dark-gray-2">
                Cathegoria
              </label>
              {
                isFetchedCategorias && categorias.map(categoria => (
                  <div key={`m${categoria.categoria_id}`} className="flex items-center gap-[10px]">
                    <input
                      className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                      type="checkbox"
                      onClick={() => filtrosSelecionados(categoria.categoria_nome)}
                    />
                    <label className="text-dark-gray-2 text-lg">{categoria.categoria_nome}</label>
                  </div>
                ))
              }
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-bold text-xl text-dark-gray-2">
                Genero
              </label>
              <div className="flex items-center gap-4">
                <input
                  className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                  type="checkbox"
                />
                <label className="text-dark-gray-2 text-lg">Maculiono</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                  type="checkbox"
                />
                <label className="text-dark-gray-2 text-lg">Feminiono</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-pink-500 checked:border-pink-500 checked:flex checked:items-center checked:justify-center checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:leading-none"
                  type="checkbox"
                />
                <label className="text-dark-gray-2 text-lg">Unisexx</label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-bold text-xl text-dark-gray-2">
                Genero
              </label>
              <div className="flex items-center gap-4">
                <input className="w-[20px] h-[20px]" type="radio" name="estado" />
                <label className="text-dark-gray-2 text-lg">Novo</label>
              </div>
              <div className="flex items-center gap-4">
                <input className="w-[20px] h-[20px]" type="radio" name="estado" />
                <label className="text-dark-gray-2 text-lg">Usado</label>
              </div>
            </div>
          </div>
        </div>
        {/* Produtos */}
        <div className="flex-1 grid grid-cols-2 md:flex md:grid-cols-3 gap-3">
          {produtos.map((produto) => (
            <div key={`p${produto.id}`} className="mb-[40px]">
              <div className="w-44 h-44 md:w-[300px] md:h-[300px] bg-white flex items-center mb-2 ">
                <img className=" w-full h-full cursor-pointer" onClick={() => console.log("rota porduto")} src={produto.img} alt="" />
              </div>
              <h6 className="text-sm font-bold text-light-gray" >{produto.nome}</h6>
              <p className="text-sm md:text-xl text-dark-gray-2 cursor-pointer" onClick={() => console.log("rota porduto")}>{produto.marca} - Masculino</p>
              <div>{`R$ ${produto.preco}`}</div>
            </div>
          ))}
        </div>
      </div>
      {mostrarMenu && menu()}
    </div>
  );
};

export default Produtos;
