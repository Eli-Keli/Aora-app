import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

// Configure the Appwrite SDK
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm-aora.aora",
  projectId: "67371d3a003cc4344e4d",
  databaseId: "6737226600180b656fd4",
  userCollectionId: "673722830022283345e8",
  videoCollectionId: "673722a2002a3bda2140",
  storageId: "673726ad003de09d5118",
};

// Initialize the Appwrite SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your API Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your platform name

// Initialize the Appwrite Account, Avatars, Databases instances
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register a new user account and create a new user document in the database
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(), // User ID
      email, // User email
      password, // User password
      username // User name
    );

    if (!newAccount) throw new Error("Account registration failed"); // Throw an error if account registration fails

    const avatarUrl = avatars.getInitials(username); // Generate an avatar URL

    await signIn(email, password); // Sign in the new user

    const { databaseId, userCollectionId } = appwriteConfig; // Destructure the database ID and collection ID

    // Create a new document in the database for the new user
    const newUser = await databases.createDocument(
      databaseId, // Database ID
      userCollectionId, // Collection ID
      ID.unique(), // Document ID
      {
        accountId: newAccount.$id, // User ID
        username, // User name
        email, // User email
        avatar: avatarUrl, // User avatar
      }
    );

    if (!newUser) throw new Error("User registration failed"); // Throw an error if user registration fails

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Sign In user
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

// Get the current user details from the database
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("User account not found"); // Throw an error if user account not found

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId, // Database ID
      appwriteConfig.userCollectionId, // Collection ID
      [Query.equal("accountId", currentAccount.$id)] // Query
    );

    if (!currentUser) throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get all videos from the database
export const getVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId, // Database ID
      appwriteConfig.videoCollectionId // Collection ID
    );

    if (!videos) throw new Error("No videos found");

    return videos.documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
