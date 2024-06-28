import axios from "axios";

export const Query = async (method: string, url: string, token: string) => {
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
