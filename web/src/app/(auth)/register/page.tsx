import { RegisterForm } from "@/components/register-form";

export default function Register() {
  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center">
        Register/Login your account
      </h1>

      <RegisterForm />
    </div>
  );
}
