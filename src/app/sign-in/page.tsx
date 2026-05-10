import SignInForm from "./SignInForm";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/dashboard" } = await searchParams;
  return <SignInForm callbackUrl={callbackUrl} />;
}
