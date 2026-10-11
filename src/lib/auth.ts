import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { setServers } from "node:dns";

// Local development only: use the router's DNS so Node can resolve mongodb+srv records.
// Not applied in production (Vercel), where DNS works normally.
if (process.env.NODE_ENV === "development") {
  setServers(["192.168.0.1"]);
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const client = globalForMongo._mongoClient ?? new MongoClient(mongoUri);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = client;

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // after signup, the user goes to the login page
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    
  },
});