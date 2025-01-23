import { axiosInstance } from "@/utils/axios";
import { GenericAbortSignal } from "axios";
import { IDestination } from "@/types/destination";

export const getDestination = (signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: IDestination[] }>('/5eb43c8c8437df75b392', { signal }).then((response) => response.data.data);
};