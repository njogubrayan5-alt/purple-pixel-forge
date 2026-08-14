import { MongoClient, ObjectId } from "mongodb";
import { toast } from "sonner";

let mongoClient: MongoClient | null = null;

async function getMongoClient() {
  if (mongoClient) return mongoClient;

  const uri = import.meta.env.VITE_MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  return mongoClient;
}

async function getDB() {
  const client = await getMongoClient();
  return client.db("firebox_techs");
}

export async function fetchProjects() {
  try {
    const db = await getDB();
    const data = await db
      .collection("projects")
      .find({})
      .sort({ sort_order: 1 })
      .toArray();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    toast.error("Failed to load projects");
    return [];
  }
}

export async function fetchServices() {
  try {
    const db = await getDB();
    const data = await db
      .collection("services")
      .find({})
      .sort({ sort_order: 1 })
      .toArray();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    toast.error("Failed to load services");
    return [];
  }
}

export async function fetchContactMessages() {
  try {
    const db = await getDB();
    const data = await db
      .collection("contact_messages")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    toast.error("Failed to load messages");
    return [];
  }
}

export async function fetchSiteSettings() {
  try {
    const db = await getDB();
    const data = await db.collection("site_settings").find({}).toArray();
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return [];
  }
}

export async function createProject(project: any) {
  try {
    const db = await getDB();
    const result = await db.collection("projects").insertOne({
      ...project,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return result;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function updateProject(id: string, updates: any) {
  try {
    const db = await getDB();
    const result = await db
      .collection("projects")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updates,
            updated_at: new Date(),
          },
        }
      );
    return result;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(id: string) {
  try {
    const db = await getDB();
    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

export async function createService(service: any) {
  try {
    const db = await getDB();
    const result = await db.collection("services").insertOne({
      ...service,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return result;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

export async function updateService(id: string, updates: any) {
  try {
    const db = await getDB();
    const result = await db
      .collection("services")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updates,
            updated_at: new Date(),
          },
        }
      );
    return result;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

export async function deleteService(id: string) {
  try {
    const db = await getDB();
    const result = await db
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}

export async function deleteContactMessage(id: string) {
  try {
    const db = await getDB();
    const result = await db
      .collection("contact_messages")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

export async function updateSiteSetting(key: string, value: any) {
  try {
    const db = await getDB();
    const result = await db
      .collection("site_settings")
      .updateOne({ key }, { $set: { value } }, { upsert: true });
    return result;
  } catch (error) {
    console.error("Error updating setting:", error);
    throw error;
  }
}
