import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido. Por favor, insira um e-mail válido.');
    } else {
      navigate("/cadastro-completo");
    }

  //   try {
  //     const response = await axios.post('/check-email', { email });

  //     if (response.exists) {
  //       setEmailError('Este email já está cadastrado.');
  //     } else {
  //       setEmailError('');
  //       console.log('Email: ', email);
  //       navigate("/cadastro-completo");
  //     }
  //   } catch (error) {
  //     console.error('Erro ao verificar email:', error);
  //     setEmailError('Erro ao verificar email. Tente novamente mais tarde.');
  //   }
  };
 
  return (
    <main className=" flex min-h-screen bg-gradient-to-b from-secondary-1 to-secondary-2 items-center justify-center">
      <section className=" flex gap-8">
        <div className="lg:h-[399px] lg:w-[583px] rounded flex flex-col items-center lg:items-start justify-center p-5 bg-white font-sans mt-9">
          <header className="flex flex-col items-center lg:items-start justify-center lg:justify-start h-[84px] mb-3 lg:mb-5">
          <h3 className="text-dark-gray text-center font-bold text-xl tracking-widest leading-8 lg:text-3xl lg:tracking-wider lg:leading-9 lg:mb-3">Crie sua conta</h3>
          <p className="text-sm lg:text-base leading-6 lg:leading-7 tracking-wide text-dark-gray-2">Já possui uma conta? Entre{" "}
            <Link to="/login" className="underline hover:text-blue-700">aqui</Link>.
          </p>
          </header>
          <form className="flex flex-col w-full mb-2" onSubmit={handleSubmit}>
            <label className="text-xs font-bold tracking-wider leading-6 mb-1" htmlFor="email">Email *</label>
            <div className="mb-5">
              <input
                className="bg-light-gray-3 text-dark-gray-3 rounded-lg leading-7 tracking-wider pl-4 w-full h-[60px] outline-none focus:bg-light-gray-2"
                type="text"
                id="email"
                name="email"
                placeholder="Insira seu email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary-1 hover:bg-tertiary transition-all duration-300 ease-out hover:ease-in w-full h-12 text-light-gray-3 font-bold leading-6 tracking-wider rounded-lg">Criar Conta</button>
            </div>
            </form>
            <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:gap-4 font-medium lg:font-normal text-sm lg:text-base leading-7 tracking-wide text-dark-gray-2 ">
              <p className="mt-3">Ou faça login com</p>
              <div className="flex gap-4 mt-3">
                <Link to="/">
                  <img className="transition-transform transform hover:translate-y-[-6px] hover:scale-110" src="src/assets/images/gmail.png" alt="Logo Gmail" />
                </Link>
                <Link to="/">
                  <img className="transition-transform transform hover:translate-y-[-6px] hover:scale-110" src="src/assets/images/facebook.png" alt="Logo Facebook" />
                </Link>
              </div>
            </div>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <img
            className="w-[400px] h-auto lg:w-[500px]"
            src="src/assets/images/tenis.png"
            alt="Tênis"
          />          
        </div>
      </section>
    </main>
  );
};
export default Cadastro;
