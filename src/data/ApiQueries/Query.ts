import axios from "axios";
import { HttpMethods } from "../../domain/constants/httpMethods";

const APIKEY = import.meta.env.VITE_X_API_KEY;
const AUTHTOKEN = import.meta.env.VITE_AUTH_TOKEN;
const BASEURL = import.meta.env.VITE_BASE_URL;

export const ThirdPartyQuery = async (method: string, url: string, token?: string) => {
  try {
    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  } catch (error: any) {
    return error.response || error;
  }
};


export const Query = async (method: string, endpoint: string, body?: {}, token?: string) => {
  try {
    const config: any = {
      method,
      url: BASEURL + endpoint,
      headers: {
        Accept: "application/json",
        "x-api-key": APIKEY,
        "auth-token": AUTHTOKEN,
        Authorization: token ? `Bearer ${token}` : null
      },
    };
    // Conditionally add the body for POST methods
    if (method === HttpMethods.POST) {
      config.data = body;
    }

    // Conditionally add the body as query parameters for PUT requests
    if ((method === HttpMethods.PUT) && body) {
      const params = new URLSearchParams(body).toString();
      config.url += `?${params}`;
    }

    // Conditionally add the body as query parameters for GET requests
    if ((method === HttpMethods.GET) && body) {
      const params = new URLSearchParams(body).toString();
      config.url += `?${params}`;
    }

    const response = await axios(config);
    return response;
  } catch (error: any) {
    return error.response || error;
  }
};
