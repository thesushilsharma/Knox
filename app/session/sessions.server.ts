// import dotenv from 'dotenv';
// dotenv.config();
import envSchema from "env";
import { createCookieSessionStorage } from "react-router";

type SessionData = {
  sessionSecret: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: envSchema.appwrite.authSession,

        // all of these are optional
        //domain: "reactrouter.com",
        // Expires can also be set (although maxAge overrides it when used in combination).
        // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        //
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === "production",
      },
    }
  );

export { getSession, commitSession, destroySession };

export const storeCookieInSession = async (sessionSecret: string) => {
  //.log("sessionSecret:", sessionSecret)
  console.log("Storing Session Cookie")
  const session = await getSession();
  session.set("sessionSecret", sessionSecret);
  const header = await commitSession(session);

  return header
}

export const getCookieFromSession = async (request: Request) => {
  console.log("Checking Session Cookie")
  const session = await getSession(request.headers.get("Cookie"));
  const sessionSecret = session.get("sessionSecret")
  return sessionSecret
}

export const destroyServerSession = async (request: Request) => {
  console.log("Destroying Session Cookie")
  const session = await getSession(request.headers.get("Cookie"));
  const sessionHeader = await destroySession(session);
  return sessionHeader;
};