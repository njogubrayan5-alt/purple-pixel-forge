import { MongoClient, Db, Collection } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || process.env.MONGODB_DATABASE;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}
if (!dbName) {
  throw new Error("MONGODB_DB / MONGODB_DATABASE environment variable is not set");
}

/**
 * Cache the client across module reloads to avoid creating multiple connections
 * in dev / serverless environments.
 */
declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var __mongoClient__: MongoClient | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis.__mongoClientPromise__) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
  globalThis.__mongoClientPromise__ = clientPromise;
  globalThis.__mongoClient__ = client;
} else {
  clientPromise = globalThis.__mongoClientPromise__ as Promise<MongoClient>;
  client = globalThis.__mongoClient__ as MongoClient;
}

async function getDb(): Promise<Db> {
  await clientPromise;
  return client.db(dbName);
}

/**
 * These functions return the MongoDB Collection objects used by the
 * server-side code (site-content.functions.ts expects to call .find(), .sort(), .toArray()).
 *
 * If your actual collection names differ, update these strings to match.
 */
export async function getProjectsCollection<T = any>(): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>("projects");
}

export async function getServicesCollection<T = any>(): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>("services");
}

export async function getSiteSettingsCollection<T = any>(): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>("site_settings");
}
