import { redirect } from "react-router";
import { destroyServerSession, getCookieFromSession, getSession } from "./sessions.server";
import { checkAuth, signOut } from "~/lib/server/auth";

export const getCurrentUser = async (request: Request) => {
    const sessionSecret = await getCookieFromSession(request);
    //  console.log("Session Secret in getCurrentUser:", sessionSecret);

    if (!sessionSecret) {
        throw redirect("/login");
    }

    const user = await checkAuth(sessionSecret);

    if (!user.isAuthenticated) {
        throw redirect("/login");
    }

    return { userData: user.userData };
};

export const signOutUser = async (request: Request) => {
    const sessionSecret = await getCookieFromSession(request);
    //console.log("Session Secret in signOutUser:", sessionSecret);


    if (!sessionSecret) {
        console.error("No session secret found. User is not authenticated.");
        throw redirect("/login");
    }

    try {
        // Sign out from Appwrite
        const { success, error } = await signOut(sessionSecret);

        if (!success) {
            console.error("Appwrite sign-out failed:", error);
            throw new Error("Failed to sign out from Appwrite");
        }

        // Destroy the session cookie
        const sessionHeader = await destroyServerSession(request);
        console.log("Server session destroyed successfully.");

        // Redirect to login page
        return redirect("/login", {
            headers: {
                "Set-Cookie": sessionHeader,
            },
        });

    } catch (error: any) {
        console.error("Error during sign-out:", error.message);
        throw new Error("An error occurred during sign-out. Please try again.");
    }
};