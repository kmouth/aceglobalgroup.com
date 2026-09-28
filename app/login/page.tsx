import { Suspense } from "react";
import LoginForm from "./LoginForm";

function LoginFallback() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="text-sm text-slate-500">
        Loading login...
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center">
        <Suspense fallback={<LoginFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}