import "../../index.css";
import Sapato from "../../assets/Sapato_direito.svg";
import Sapatoo from "../../assets/Sapato_esquerdo.svg";
import Gmail from "../../assets/gmail.svg";
import Facebook from "../../assets/Face.svg";
import { useForm } from "react-hook-form";
import axios from "axios";

const RecuperarSenha = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/RecuperarSenha", data);
      console.log("Deu bom", response.data);
    } catch (error) {
      console.error("Deu ruim", error);
    }
  };

  return (
    <main className="min-h-screen">
    <section className="bg-custom-gradient h-screen flex justify-center items-center">
      <div className="flex flex-col lg:flex-row justify-between gap-3 py-20 px-4 lg:px-24 h-full w-full max-w-6xl">
        <div className="w-full lg:w-[650px] h-auto lg:h-[300px] bg-white rounded-md relative z-10 mx-auto lg:mx-0">
          <div className="p-6 m-4 flex flex-col">
            <h3 className="text-black font-bold py-3">Esqueceu a senha?</h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black font-bold">
                  Digite o email para verificacao *
                </label>
                <input
                  className="bg-zinc-50 h-12 rounded-sm placeholder:text-gray-400 text-sm placeholder: p-3"
                  type="email"
                  placeholder="Insira seu email"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
            <div className="p-2 py-6">
              <div className="bg-pink-600 flex justify-center h-10 rounded-lg">
                <button
                  onClick={() => handleSubmit(onSubmit)()}
                  className="w-full text-sm text-white font-bold"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full">
          <img
            className="hidden lg:block lg:absolute lg:top-1 lg:left-14 lg:transform lg:rotate-[350deg]"
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

export default RecuperarSenha;
