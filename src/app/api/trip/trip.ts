import { axiosInstance } from "@/utils/axios";
import { GenericAbortSignal } from "axios";
import { ITrip } from "@/types/trip";

export const getTrip = (signal?: GenericAbortSignal) => {
    return axiosInstance.get<{ data: ITrip[] }>('/bb430c04263e1b50c70a', { signal }).then((response) => response.data.data);
};