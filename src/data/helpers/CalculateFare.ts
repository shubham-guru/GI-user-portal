import { rateData } from "../../domain/constants/rateData";

export const calculateFare = (weight: number) => {
    for (let i = 0; i < rateData.length; i++) {
      if (weight > rateData[i].start && weight <= rateData[i].end) {
        return rateData[i].rate;
      }
    }
    return 0;
  };