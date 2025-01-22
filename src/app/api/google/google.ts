import { axiosInstance } from "@/utils/axios";
import { IGoogleReview } from "@/types/google";
import { GenericAbortSignal } from "axios";

export const getGoogleReview = (signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IGoogleReview }>('/93a922e539e279c961d5', { signal }).then((response) => response.data.data);
};