interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export async function handleResponse<T>(response: Response) {
  try {
    const data = await response.json();
    if (response.ok) return { data: data as T };

    if (!response.ok && response.status < 500) {
      return { error: data as ErrorResponse };
    }

    throw new Error(data.message || "Something went wrong!");
  } catch (error) {
    throw error;
  }
}
