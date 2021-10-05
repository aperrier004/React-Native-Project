import * as React from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { ResponseType, useAuthRequest } from "expo-auth-session"; //pour faire implicit flow
WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
let redirectUri = "exp://localhost:19000/--/";
let access_token = null;
export default function getToken() {
  debugger;

  if (Platform.OS == "web") {
    redirectUri = "http://localhost:19006/";
  }
  if (Platform.OS == "android") {
    redirectUri = "exp://10.198.10.220:19000/--/"; // Mariam : "exp://192.168.1.21:19000/--/"; Alban : //"exp://10.198.56.49:19000/--/"; Juliette : "exp://10.198.10.220:19000/--/"
  }
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token, //pour faire implicit flow
      clientId: "53b19fca39ae4615950c77502815e69c",
      scopes: [
        "user-read-email",
        "user-top-read",
        "user-read-private",
        "user-read-recently-played",
        "user-library-modify",
        "playlist-read-collaborative",
        "playlist-read-private",
        "ugc-image-upload",
        "playlist-modify-public",
        "playlist-modify-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
    debugger;
    if (response?.type === "success") {
      //const { code } = response.params;
      access_token = response.params; //pour faire implicit flow
    }
  }, [response]);

  return [request, response, promptAsync, access_token];
}

export function getAccess_token() {
  return access_token;
}
