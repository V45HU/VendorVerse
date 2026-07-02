import AuthLayout from "../components/Auth/AuthLayout";
import AuthCard from "../components/Auth/AuthCard";
import RegisterForm from "../components/Auth/RegisterForm";

function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join VendorVerse and connect with trusted event professionals."
    >
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
