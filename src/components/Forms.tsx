import { useForm } from "react-hook-form";

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
  const onSubmit = (data: FormValues) => console.log(data);
  const password = watch("password");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            {...register("name", { required: "Nome é obrigatório" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
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
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
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
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirmação da senha"
            {...register("confirmPassword", {
              required: "Confirmação de senha é obrigatória",
              validate: value => value === password || "As senhas não coincidem"
            })}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>

        <div>
          <label htmlFor="profession">Profissão</label>
          <select
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
          {errors.profession && <span>{errors.profession.message}</span>}
        </div>

        <div>
          <div>
            <input
              id="privacyPolicy"
              type="checkbox"
              {...register("privacyPolicy", { required: "Aceitação dos termos de privacidade é obrigatória" })}
            />
            <label htmlFor="privacyPolicy">Concordo com os termos de privacidade</label>
            {errors.privacyPolicy && <span>{errors.privacyPolicy.message}</span>}
          </div>
        </div>

        <div>
          <button type="submit">Criar conta</button>
        </div>
      </form>
    </div>
  );
};

export default Forms;