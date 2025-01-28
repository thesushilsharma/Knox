import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";

export async function signUpUsingEmailOTP(email: string) {
    const uniqueId = ID.unique();

    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken(uniqueId, email, true);

        console.log('OTP:', session.secret);

        const userId = session.userId;
        const phrase = session.phrase;
        const redirectUrl = `/OTPverify?userId=${encodeURIComponent(
            userId
        )}&phrase=${encodeURIComponent(phrase)}`;

        return {
            secret: session.secret, // Session secret to store in cookies
            redirectUrl, // Redirect URL for the next step
        };
    } catch (error: any) {
        console.error("OTP login failed:", error.message);
        throw new Error("Failed to create session: " + error.message);
    }
}

export async function createOTPSession(userId: string, secret: string) {
    const { account } = await createAdminClient();

    try {
        const session = await account.createSession(userId, secret);
        return session;
    } catch (error: any) {
        console.error("OTP verification failed:", error.message);
        throw new Error("Failed verify session: " + error.message);
    }
}

export async function checkAuth(sessionSecret: string) {
    try {
        //console.log("Session Secret:", sessionSecret);

        const createClientResponse = await createSessionClient(sessionSecret);
        const { account } = createClientResponse;

        const userData = await account.get();

        return {
            isAuthenticated: true,
            userData: {
                $id: userData.$id,
                name: userData.name,
                email: userData.email,
            },
        };
    } catch (error: any) {
        console.error("User Authentication Error:", error);
        return {
            isAuthenticated: false,
            userData: null,
        };
    }
}

export async function signOut(sessionSecret: string) {
    const { account } = await createSessionClient(sessionSecret);

    try {
        // Delete all sessions for the user
        await account.deleteSessions();

        return { success: true, error: null };
    } catch (error: any) {
        console.error("Sign out failed:", error.message);
        return {
            success: false,
            error: error?.message || "An unexpected error occurred",
        };
    }
}