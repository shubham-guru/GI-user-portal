import { rateData } from "../../domain/constants/rateData";

export const calculateFare = (weight: number): number => {
  // Find the rate object where the weight falls between start and end
  const rateObj = rateData.find(({ start, end }) => weight >= start && weight <= end);

  if (rateObj) {
    return rateObj.rate * weight;
  }

  return 0;
};
