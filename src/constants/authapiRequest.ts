import axios, { Method, AxiosError } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
}

export async function apiRequest<T>(
  endpoint: string,
  method: Method,
  values: object = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await axios<T>({
      url: endpoint,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    });

    const data = response.data as { message?: string; data?: T };

    return {
      success: true,
      message: data.message ?? "Request successful",
      data: data.data ?? null,
    };
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    return {
      success: false,
      message:
        error.response?.data?.message ??
        error.message ??
        "An error occurred",
    };
  }
}
