import AuthLayout from "../components/Auth/AuthLayout";
import AuthCard from "../components/Auth/AuthCard";
import LoginForm from "../components/Auth/LoginForm";

function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your VendorVerse journey."
    >
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
