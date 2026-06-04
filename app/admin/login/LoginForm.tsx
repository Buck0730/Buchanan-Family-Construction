"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = { error: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm border border-steel bg-concrete p-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-hazard font-display text-xl text-ink">
            B
          </span>
          <div>
            <p className="font-display text-lg tracking-tight text-bone">
              Buchanan
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-fog">
              Admin
            </p>
          </div>
        </div>

        <h1 className="font-display text-3xl uppercase text-bone">Sign in</h1>
        <p className="mt-2 text-sm text-fog">
          Enter the admin password to manage the phone agent.
        </p>

        <form action={formAction} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-fog"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full border border-steel bg-transparent px-4 py-3.5 text-bone transition-colors focus:border-hazard focus:outline-none"
            />
          </div>

          {state.error && (
            <p className="border border-hazard/60 bg-hazard/10 px-4 py-3 text-sm text-bone">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full border border-hazard bg-hazard px-7 py-4 font-display text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:bg-bone hover:border-bone disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
