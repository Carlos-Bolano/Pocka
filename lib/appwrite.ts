import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
  platform: "com.calisto.pocka",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function loginWithGoogle() {
  try {
    const redirect = Linking.createURL("/");
    const response = await account.createOAuth2Token(OAuthProvider.Google, redirect);

    if (!response) throw new Error("Failed to log in with Google");

    const browserResponse = await openAuthSessionAsync(response.toString(), redirect);

    if (browserResponse.type !== "success") throw new Error("Failed to log in with Google");

    const url = new URL(browserResponse.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to log in with Google");

    const session = await account.createSession(userId, secret);

    if (session) return true;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    return null;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
