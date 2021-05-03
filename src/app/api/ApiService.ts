import axios, {AxiosInstance} from "axios";
import {AppConfig} from "../AppConfig";

export class ApiService {
    public static api:AxiosInstance

    public static init() {
        ApiService.api = axios.create({
            baseURL: AppConfig.getApiUrl(),
        });

        ApiService.api.interceptors.response.use((response) => response, (error) => {
            const errorMessage = error?.response?.data?.errorMessage;

            if (errorMessage) {
                alert(errorMessage);
            }

            return Promise.reject(error);
        });
    }
}
