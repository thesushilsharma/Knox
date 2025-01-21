const envSchema = {
    appwrite: {
        endpoint: String('https://cloud.appwrite.io/v1'),
        projectId: String(process.env.APPWRITE_PROJECT_ID!),
        apikey: String(process.env.APPWRITE_API_KEY!),
        authSession: String('appwrite-session')
    }
}

export default envSchema
