export const queryStringify = (data: Record<string, any>) => {
  return Object.keys(data)
    .map(
      (key, _) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
};
