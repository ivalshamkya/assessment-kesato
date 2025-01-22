import { axiosInstance } from "@/utils/axios";
import { IGoogleReview } from "@/types/google";
import { GenericAbortSignal } from "axios";
import { IBoats } from "@/types/boat";

export const getBoat1 = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IBoats }>('/f609e81ec2f113e78129', { params, signal }).then((response) => response.data.data);
};

export const getBoat2 = (params?: any, signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IBoats }>('/d6b9738cf1eb1c4b7cf2', { params, signal }).then((response) => response.data.data);
};