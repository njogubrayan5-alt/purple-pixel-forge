import { MongoClient, Db, Collection } from "mongodb";

/**
 * Lazy MongoDB connection helper.
 *
 * Avoid throwing at module import time so the server process can start even when
 * environment variables are not set (prevents a 502 caused by a startup crash).
 *
 * If the application actually tries to access the DB without the required env vars,
 * getDb() will throw a clear error.
 */

function getEnvVar(name: string): string | undefined {
  const v = process.env[name];
  return v === "" ? undefined : v;
}

const uri = getEnvVar("MONGODB_URI");
const dbName = getEnvVar("MONGODB_DB") ?? getEnvVar("MONGODB_DATABASE");

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var __mongoClient__: MongoClient | undefined;
}

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

function ensureMongoEnv(): void {
  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is not set. Set MONGODB_URI in your deployment environment.",
    );
  }
  if (!dbName) {
    throw new Error(
      "MONGODB_DB / MONGODB_DATABASE environment variable is not set. Set one of these in your deployment environment.",
    );
  }
}

async function getClient(): Promise<MongoClient> {
  if (client) return client;
  if (globalThis.__mongoClientPromise__) {
    clientPromise = globalThis.__mongoClientPromise__ as Promise<MongoClient>;
    client = (globalThis.__mongoClient__ as MongoClient) ?? undefined;
    const resolved = await clientPromise;
    client = resolved;
    return client;
  }

  // Validate env before attempting to connect so errors are clear and delayed
  ensureMongoEnv();

  const _client = new MongoClient(uri!);
  const _promise = _client.connect();

  globalThis.__mongoClientPromise__ = _promise;
  globalThis.__mongoClient__ = _client;

  clientPromise = _promise;
  client = _client;

  const resolved = await clientPromise;
  client = resolved;
  return client;
}

export async function getDb(): Promise<Db> {
  const c = await getClient();
  return c.db(dbName!);
}

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
