import { axiosInstance } from "@/utils/axios";
import { IGoogleReview } from "@/types/google";
import { GenericAbortSignal } from "axios";
import { IBoats } from "@/types/boats";

export const getBoats = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IBoats }>('/f609e81ec2f113e78129', { params, signal }).then((response) => response.data.data);
};