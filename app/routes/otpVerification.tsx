import { Form, useLoaderData, useActionData, redirect } from "react-router";
import { createOTPSession } from "~/lib/server/auth";
import type { Route } from "./+types/otpVerification";
import { storeCookieInSession } from "~/session/sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const securityPhrase = url.searchParams.get("phrase");

    if (!userId || !securityPhrase) {
        throw new Error("User ID or security phrase is missing. Please try again.");
    }

    return { userId, securityPhrase };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const userId = data.userId as string;
    const secret = data.otp as string;

    console.log("userId:", userId);
    console.log("secret:", secret);

    if (!userId || !secret) {
        throw new Error("Invalid input: userId and OTP are required.");
    }

    try {
        const session = await createOTPSession(userId, secret);
        const sessionHeader = await storeCookieInSession(session.secret);

        return redirect("/dashboard", {
            headers: {
                "Set-Cookie": sessionHeader,
            },
        });
    } catch (error: any) {
        return { error: error.message };
    }
}

export default function PasswordlessOTPSession({ loaderData }: Route.ComponentProps) {
    const { userId, securityPhrase } = useLoaderData<typeof loader>();

    // const { error } = loaderData;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-700">
                <Form method="post" className="space-y-6">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Passwordless login
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Enter the OTP sent to your email to verify your identity.
                        </p>
                    </div>

                    {securityPhrase && (
                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                            <p className="text-gray-300">
                                <strong className="text-cyan-400">Security Phrase:</strong>{' '}
                                <span className="font-medium">{securityPhrase}</span>
                            </p>
                        </div>
                    )}

                    <input type="hidden" name="userId" value={userId} />

                    <div className="space-y-2">
                        <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-300"
                        >
                            OTP
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            inputMode="numeric"
                            placeholder="Enter your OTP"
                            autoFocus
                            required
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg 
                           focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                           p-2.5 sm:p-3 text-sm sm:text-base
                           placeholder-gray-400 transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center
                         bg-gradient-to-r from-cyan-500 to-cyan-600
                         hover:from-cyan-600 hover:to-cyan-700
                         text-white font-semibold
                         rounded-lg px-5 py-2.5 sm:py-3
                         transition duration-200
                         focus:ring-4 focus:ring-cyan-500/50"
                    >
                        Verify OTP
                    </button>
                </Form>
            </div>
        </div>
    );
}
