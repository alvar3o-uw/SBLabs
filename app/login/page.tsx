"use client";

import type { FormEvent } from "react";
import { createClient } from "../../lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [message, setMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Signed in Successfully.");
            router.push("/");
        }
    }

  return (
    <main>
      <h1>Sign in to SBLabs</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Sign In</button>
        <p role="status">{message}</p>
      </form>
    </main>
  );
}
