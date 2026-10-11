import { SignUp } from "@clerk/nextjs";
import { AuthShell, clerkAppearance } from "@/components/account/auth-shell";

export default function Page() {
  return (
    <AuthShell
      eyebrow="Create your workspace"
      alternate={{ prompt: "Already have an account?", label: "Sign in", href: "/sign-in" }}
    >
      <SignUp path="/sign-up" appearance={clerkAppearance} />
    </AuthShell>
  );
}
