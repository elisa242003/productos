import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function MagicLink({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const sendLink = async (formData: FormData) => {
    "use server";

    const origin =headers().get("origin");

    const email = formData.get("email") as string;
   
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options:{
        shouldCreateUser:false, //solo para usuarios registrados
        emailRedirectTo:`${origin}/auth/callback`,
      }
    });

    if (error) {

      return redirect("/login/link?message=Ocurrio un error");
    }

    return redirect("/login/link?message=Revisar el link que se envio a tu email");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={sendLink}
      >
        <p>Ingresa el correo de tu cuenta con el link de acceso rapido</p>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Enviar acceso rapido
         </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}