import { HttpMethods } from "../../domain/constants/httpMethods";
import { Query } from "../ApiQueries/Query";
import { apiRoutes } from "../routes/apiRoutes";

export const fetchAddresses = async (token?: string) => {
    const data = await Query(HttpMethods.GET, apiRoutes.GET_ADDRESSES, {}, token).then((res) => {
        if (res.status === 200) {
            return res?.data?.addresses?.map((item: {[key: string]: string}) => {
                return {
                    label: item.COMPLETE_ADDRESS + ", " + item.CITY + ", " + item.STATE + ", " + item.COUNTRY + ", " + item.PIN_CODE,
                    value: item.USER_ADDRESS_ID
                };
            });
        } else {
            // Handle the case when status is not 200
            console.error("Error fetching addresses:", res.statusText);
            return [];
        }
    }).catch((error) => {
        console.error("Error in Query:", error);
        return [];
    });

    return data;
};