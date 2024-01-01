import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function Form() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3)
      .matches(/[a-zA-Z]/)
      .required("Please type your name"),
    email: yup
      .string()
      .email("email is invalid")
      .required("Please type your email"),
    password: yup
      .string()
      .min(6)
      .max(12)
      .matches(/[a-zA-Z0-9_\-\.]/)
      .required("Please type your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")])
      .required("Please confirm your password"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = (date) => {
    console.log(date);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="App">
      <input
        className="input"
        type="text"
        placeholder="Name"
        {...register("name")}
      />
      {errors.name && <p>{errors.name?.message}</p>}
      <input
        className="input"
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && <p>{errors.email?.message}</p>}
      <input
        className="input"
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      {errors.password && <p>{errors.password?.message}</p>}
      <input
        className="input"
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
      <input className="input" type="submit" />
    </form>
  );
}

export default Form;
