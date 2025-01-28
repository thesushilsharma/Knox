// import dotenv from 'dotenv';
// dotenv.config();
import { Client, Account, Users } from "node-appwrite";
import envSchema from "env";


export async function createSessionClient(sessionSecret: string) {
    const client = new Client()
        .setEndpoint(envSchema.appwrite.endpoint)
        .setProject(envSchema.appwrite.projectId);

    // Get the session cookie from the request and set the session
    if (sessionSecret) {
        client.setSession(sessionSecret);
    }
    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(envSchema.appwrite.endpoint)
        .setProject(envSchema.appwrite.projectId)
        .setKey(envSchema.appwrite.apikey);

    return {
        get account() {
            return new Account(client);
        },
        get users() {
            return new Users(client);
        },
    };
}