import { SignIn } from "@clerk/nextjs";
import { AuthShell, clerkAppearance } from "@/components/account/auth-shell";

export default function Page() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      alternate={{ prompt: "New to Somafit?", label: "Create an account", href: "/sign-up" }}
    >
      <SignIn path="/sign-in" appearance={clerkAppearance} />
    </AuthShell>
  );
}
