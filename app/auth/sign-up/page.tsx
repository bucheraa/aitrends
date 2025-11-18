import { AuthForm } from "@/components/auth/auth-form";

export default function SignUp() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <AuthForm type="sign-up" />
        </div>
    );
}