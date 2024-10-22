import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { InputMask } from 'primereact/inputmask';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCreateUser } from "../hooks/usuarioHooks";
import { useCreateAddress } from "../hooks/enderecosHooks";
import { useNavigate } from "react-router-dom";


const CadastroCompletoContainer = styled.div`
  background-color: #f9f8fe;
  & form{
    width: 750px;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 150px;
  }
  & .informacoesPessoais,
  .informacoesDeEntrega {
    color: #474747;
    font-family: "Inter", sans-serif;
    font-weight: 700;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 4px;
    gap: 20px;
  }

  & .informacoesDeEntrega {
    margin-top: 10px;
  }

  & .topo-form {
    margin: 70px 0px 22px 0;
    height: 36px;
    display: block;
    
}

  & h2 {
    letter-spacing: 1px;
    line-height: 36px;
    margin-bottom: 22px;
    font-weight: 700;
    font-size: 32px;
    color: #1f1f1f;
    height: 36px;
  }

  & h4 {
    font-size: 14px;
    gap: 365px;
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 20px;
    letter-spacing: 0.75px;
    line-height: 22px;
    color: #474747;
    border-bottom: 2px solid #cccccc;
  }

  & input {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.75px;
    padding: 12px;
    display: block;
    background-color: #47474710;
    color: #666666;
  }

  & input:focus-visible {
    outline: 1px solid #c92071;
  }

  & input[type="checkbox"] {
    accent-color: #c92071;
  }

  & label {
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0.75px;
    width: 100%;
    height: 24px;
  }

  & .confirmacao {
    width: 100%;
    height: 44px;
    margin: 0 auto;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 40px;
  }

  & .confirmacao input {
    display: inline-block;
    width: 22px;
    height: 22px;
    align-items: center;
    margin-right: 10px;
  }

  & .confirmacao label {
    align-items: center;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0.25px;
    color: #474747;
    padding-right: 32px;
  }

  & .btn {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  & button {
    width: 100%;
    height: 48px;
    margin-top: 40px;
    background: #c92071;
    color: #f5f5f5;
    border-radius: 6px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.75px;
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    & form {
      width: 100%;
      padding: 0 30px;
      & h2{
        text-align: center;
      }
    }
  }
`;

const CadastroCompleto = () => {

  const { register, handleSubmit, setValue } = useForm();
  const { email } = useContext(AuthContext);
  const { mutateAsync: create } = useCreateUser();
  const { mutateAsync: createAddress } = useCreateAddress();
  const navigate = useNavigate();

  setValue('usuario_email', email);

  function carregarEndereco(cep) {
    const cepTratado = cep.replace('-','');
    fetch(`http://viacep.com.br/ws/${cepTratado}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("endereco_cep", cepTratado);
        setValue("endereco_rua", data.logradouro);
        setValue("endereco_bairro", data.bairro);
        setValue("endereco_cidade", data.localidade);
        setValue("endereco_estado", data.uf);
      });
  }

  const cadastroUsuario = (dados) => {
    const { 
      endereco_cep, 
      endereco_rua, 
      endereco_numero, 
      endereco_complemento, 
      endereco_bairro, 
      endereco_cidade, 
      endereco_estado 
    } = dados;

    const endereco = { 
      endereco_cep, 
      endereco_rua, 
      endereco_numero, 
      endereco_complemento, 
      endereco_bairro, 
      endereco_cidade, 
      endereco_estado 
    };

    dados.usuario_senha = dados.usuario_cpf.replaceAll('.','').replaceAll('-','');

    create(dados, {
      onSuccess: (response) => {
        endereco.usuario_id = response.usuario_id
        createAddress(endereco, {
          onSuccess: () => {
            alert(response.detail);
            navigate('/login')
          }
        });
      },
      onError: (error) => {
        console.log(error.message);
      },
    })
  }

  return (
    <CadastroCompletoContainer>

      <form onSubmit={handleSubmit(cadastroUsuario)}>
        <h2 className="form-criar">Criar Conta</h2>
        <section className="informacoesPessoais">
          <h4>Informações Pessoais</h4>
          <label htmlFor="nomecompleto">Nome Completo *</label>
          <input
            id="nomecompleto"
            type="text"
            placeholder="Insira seu nome"
            className="mb-3"
            {...register('usuario_nome')}
            required
          />

          <label htmlFor="cpf">CPF *</label>
          <InputMask
            id="cpf"
            mask="999.999.999-99"
            placeholder="Insira seu CPF"
            className="mb-3"
            {...register('usuario_cpf')}
            required
          />

          <label htmlFor="email">E-mail *</label>
          <input
            type="email"
            name=""
            id="email"
            placeholder="Insira seu e-mail"
            className="mb-3"
            required
            {...register('usuario_email')}
          />

          <label htmlFor="celular">Celular *</label>
          <InputMask 
            id="celular" 
            mask="(99) 99999-9999" 
            placeholder="Insira seu celular" 
            {...register('usuario_celular')}
            required 
          />
        </section>
        <section className="informacoesDeEntrega">
          <h4>Informações de Entrega</h4>
          <label htmlFor="cep">CEP *</label>
          <InputMask id="cep" mask="99999-999" placeholder="Insira seu cep"
            onChange={(e) => {
              if (!e.target.value.includes('_') && e.target.value != '') {
                carregarEndereco(e.target.value);
              }
            }}
            className="mb-3"
            required />

          <label htmlFor="endereco">Endereço *</label>
          <input
            id="endereco"
            type="text"
            placeholder="Insira seu endereço"
            {...register("endereco_rua")}
            className="mb-3"
            required
          />

          <label htmlFor="complemento">Número * </label>
          <input
            type="text"
            name=""
            id="numero"
            placeholder="Insira seu número"
            {...register('endereco_numero')}
            className="mb-3"
          />

          <label htmlFor="complemento">Complemento </label>
          <input
            type="text"
            name=""
            id="complemento"
            className="mb-3"
            placeholder="Insira complemento"
            {...register('endereco_complemento')}
          />


          <label htmlFor="bairro">Bairro *</label>
          <input
            type="text"
            name=""
            id="bairro"
            placeholder="Insira seu bairro"
            className="mb-3"
            {...register("endereco_bairro")}
            required
          />

          <label htmlFor="cidade">Cidade *</label>
          <input
            type="text"
            name=""
            id="cidade"
            placeholder="Insira sua cidade"
            className="mb-3"
            {...register("endereco_cidade")} required
          />
          <label htmlFor="uf">Estado *</label>
          <input
            type="text"
            name=""
            id="uf"
            placeholder="Insira seu estado"
            className="mb-3"
            {...register("endereco_estado")} required
          />
        </section>
        <section className="confirmacao">
          <input type="checkbox" name="" />
          <label htmlFor="">
            Quero receber por email ofertas e novidades das lojas da Digital
            Store. A frequência de envios pode variar de acordo com a interação
            do cliente.
          </label>
          <div className="btn">
            <button className="btn-confirmacao">Criar Conta</button>
          </div>
        </section>
      </form>
    </CadastroCompletoContainer>
  );
};

export default CadastroCompleto;
