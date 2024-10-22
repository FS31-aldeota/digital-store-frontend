import "../index.css";
import Sapato from "../assets/Sapato_direito.svg";
import Sapatoo from "../assets/Sapato_esquerdo.svg";
import Gmail from "../assets/gmail.svg";
import Facebook from "../assets/Face.svg";
import { useForm } from "react-hook-form";
import HeaderLogin from "./HeaderLogin";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLoginUser } from "../hooks/usuarioHooks";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const { setUsuario } = useContext(AuthContext);
  const { mutateAsync: login} = useLoginUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      login(data, {
        onSuccess: (usuarioLogado) => {
          console.log(usuarioLogado);
          if(usuarioLogado.status){
            alert(usuarioLogado.detail);
            return;
          }
          setUsuario(usuarioLogado);
          sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado));
          navigate('/');
        }
      })
    } catch (error) {
      console.error("Deu ruim", error);
    }
  };

  return (
    
    <main className="min-h-screen">
    <HeaderLogin />
    <section className="bg-custom-gradient min-h-screen flex justify-center items-center">
      <div className="flex flex-col lg:flex-row justify-between gap-3 py-20 px-4 lg:px-24 h-full w-full max-w-6xl">
        <div className="w-full lg:w-[850px] h-auto lg:h-[550px] bg-white rounded-md relative z-10 mx-auto lg:mx-0">
          <div className="p-6 m-4">
            <h3 className="text-black font-bold">Acesse a sua conta</h3>
            <p className="text-lg text-zinc-800 py-4">
              Novo cliente? Então registre-se{" "}
              <button className="underline hover:text-pink-700">aqui.</button>
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black font-bold">Login *</label>
                <input
                  className="bg-zinc-50 h-12 text-black rounded-sm placeholder:text-gray-400 placeholder:text-sm text-sm placeholder: p-3"
                  type="email"
                  placeholder="Insira seu login ou email"
                  {...register("usuario_email", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black font-bold">Senha *</label>
                <input
                  className="bg-zinc-50 h-12 text-black rounded-sm placeholder:text-gray-400 placeholder:text-sm text-sm placeholder: p-3"
                  type="password"
                  placeholder="Insira sua senha"
                  {...register("usuario_senha", { required: true })}
                />
              </div>
              <span className="text-sm text-zinc-800 py-6">
                <Link className="underline hover:text-pink-700" to={"/recuperar"}>
                  Esqueci minha senha
                </Link>
              </span>
            </div>
            <div className="p-2">
              <div className="bg-pink-600 flex justify-center h-10 rounded-lg hover:bg-tertiary">
                <button
                  onClick={() => handleSubmit(onSubmit)()}
                  className="w-full text-sm text-white font-bold "
                >
                  Acessar conta
                </button>
              </div>
            </div>
  
            <div className="flex justify-center py-12 gap-4">
              <span className="text-sm text-zinc-800">Ou faça login com</span>
              <img className='cursor-pointer' src={Gmail} alt="Gmail" />
              <img className='cursor-pointer' src={Facebook} alt="Facebook" />
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full">
          <img
            className="hidden lg:block lg:absolute lg:top-1 lg:left-1 lg:transform lg:rotate-[350deg]"
            src={Sapato}
            alt="sapato"
            style={{ height: "400px" }}
          />
          <img
            className="hidden lg:block lg:absolute lg:top-20 lg:right-0 lg:transform lg:-rotate-12"
            src={Sapatoo}
            alt="sapato"
            style={{ height: "400px" }}
          />
        </div>
      </div>
    </section>
  </main>
  
  );
};

export default Login;
