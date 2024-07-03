import { getServerAuthSession } from "@/server/auth";
import HeaderTypewriter from "@/components/landing/header-typewriter";
import SignInButton from "@/components/navbar/sign-in-btn";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between w-full">
      <section>
        <div className="flex h-screen justify-center items-center">
          <div className="text-center flex flex-col gap-4 w-full ">
            <h1 className="text-4xl">
              OctoCord is a:
            </h1>
            <HeaderTypewriter />
            <SignInButton className="place-self-center mt-2" session={session} main />
          </div>
        </div>
      </section>
    </main>
  );
}