import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {AppAPI} from "../appApi";

export interface IFetchOptions {
	method: "GET" | "POST" | "DELETE" | "OPTIONS" | "PATCH" | "PUT";
	url: string;
	data?: object;
	baseUrl?: string;
	authToken?: string;
}

export interface IConstructorParams {
	baseUrl?: string;
	authToken?: string;
}

export class AxiosClient {
	private readonly axiosRequestConfig: AxiosRequestConfig = {};
	private readonly http: AxiosInstance;

	constructor({baseUrl = "", authToken = ""}: IConstructorParams | undefined = {}) {
		this.axiosRequestConfig = {
			baseURL: baseUrl || AppAPI.apiBaseUrl,
			headers: {
				Authorization: `${authToken}`,
			}
		}
		this.http = axios.create(this.axiosRequestConfig);
	}

	public fetch = async ({url, method, data, baseUrl, authToken}: IFetchOptions): Promise<AxiosResponse["data"] | AxiosError | Error> => {
		let config = {
			...this.axiosRequestConfig,
		}
		if (baseUrl) {
			config = {
				...config,
				baseURL: baseUrl,
			}
		}

		if (authToken) {
			config = {
				...config,
				headers: {
					...config.headers,
					Authorization: `${authToken}`,
				}
			}
		}

		const response = await this.http({
			...config,
			url,
			method,
			data,
		});
		return response.data;
	}
}

export default AxiosClient;
