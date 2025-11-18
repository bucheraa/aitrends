import { AuthForm } from "@/components/auth/auth-form";

export default function SignIn() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <AuthForm type="sign-in" />
        </div>
    );
}