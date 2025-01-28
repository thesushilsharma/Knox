import { data, redirect, useActionData, useLoaderData } from "react-router";
import type { Route } from "./+types/login";
import { getSession, commitSession, storeCookieInSession } from "../session/sessions.server";
import { signUpUsingEmailOTP } from "~/lib/server/auth";
import { Mail } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    // Redirect to the dashboard if the user is already signed in
    if (session.has("sessionSecret")) {
        return redirect("/dashboard");
    }

    // Check if there's an error in the session
    const error = session.get("error");

    // Only commit the session if there's an error to store
    if (error) {
        return data(
            { error },
            {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            }
        );
    }

    // Return no data and no cookie if there's no error
    return data({ error: null });
}

export async function action({ request }: Route.ActionArgs) {
    const form = await request.formData();
    const email = form.get("email") as string;

    if (!email) {
        throw new Error("Email is required");
    }

    try {
        // Call the signUpUsingEmailOTP function
        const session = await signUpUsingEmailOTP(email);

        if (!session) {
            throw new Error("Failed to create session");
        }

        const sessionHeader = await storeCookieInSession(session.secret);

        // Commit the session and set the cookie
        return redirect(session.redirectUrl, {
            headers: {
                "Set-Cookie": sessionHeader,
            },
        });
    } catch (error: any) {
        // Handle errors and flash them to the user
        const session = await getSession(request.headers.get("Cookie"));
        session.flash("error", error.message || "An error occurred during login");

        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
}

export default function Login({ loaderData }: Route.ComponentProps) {
    const { error } = useLoaderData<typeof loader>();
    // const { error } = useActionData<typeof action>();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
                {error && (
                    <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
                        {error}
                    </div>
                )}
              
                <form method="POST" className="space-y-6">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Sign up / Sign in
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Let’s make some knox happen
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         p-2.5 sm:p-3 text-sm sm:text-base
                         placeholder-gray-400 transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2
                       bg-gradient-to-r from-cyan-500 to-cyan-600
                       hover:from-cyan-600 hover:to-cyan-700
                       text-gray-900 font-semibold
                       rounded-lg px-5 py-2.5 sm:py-3
                       transition duration-200
                       focus:ring-4 focus:ring-cyan-500/50"
                    >
                        <Mail className="w-5 h-5" />
                        Continue with Email
                    </button>
                </form>
            </div>
        </div>
    );
}


