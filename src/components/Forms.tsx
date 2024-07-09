import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import "../App.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profession: string;
  privacyPolicy: boolean;
}

const Forms = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const password = watch("password");
  const onSubmit = () => {
    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    });
  };
  
  return (
    <div className="container p-5 border border-gray border-5 rounded-4">
      <h1 className="display-4">Formulário de Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            className="form-control"
            id="name"
            type="text"
            placeholder="Seu nome"
            {...register("name", { required: "Nome é obrigatório" })}
          />
          {errors.name && <span className="mensagemErro">{errors.name.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="Seu e-mail"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Formato de e-mail inválido"
              }
            })}
          />
          {errors.email && <span className="mensagemErro">{errors.email.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Senha"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caracteres"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número"
              }
            })}
          />
          {errors.password && <span className="mensagemErro">{errors.password.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
          <input
            className="form-control"
            id="confirmPassword"
            type="password"
            placeholder="Confirmação da senha"
            {...register("confirmPassword", {
              required: "Confirmação de senha é obrigatória",
              validate: value => value === password || "As senhas não coincidem"
            })}
          />
          {errors.confirmPassword && <span className="mensagemErro">{errors.confirmPassword.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="profession" className="form-label">Profissão</label>
          <select
            className="form-select"
            id="profession"
            {...register("profession", {
              required: "Profissão é obrigatória",
              validate: value => value !== "0" || "Por favor, selecione sua profissão"
            })}
          >
            <option value="0">Selecione sua profissão</option>
            <option value="developer">Desenvolvedor</option>
            <option value="professor">Professor</option>
            <option value="other">Outra</option>
          </select>
          {errors.profession && <span className="mensagemErro">{errors.profession.message}</span>}
        </div>

        <div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              id="privacyPolicy"
              type="checkbox"
              {...register("privacyPolicy", { required: "Aceitação dos termos de privacidade é obrigatória" })}
            />
            <label htmlFor="privacyPolicy" className="form-check-label">Concordo com os termos de privacidade</label>
             {errors.privacyPolicy && <div className="error-message mensagemErro">{errors.privacyPolicy.message}</div>}
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-outline-secondary">Criar conta</button>
        </div>
      </form>
    </div>
  );
};

export default Forms;