export const queryStringify = (data: Record<string, any>) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined || data[key] === null) {
      delete data[key];
    }
  });
  return Object.keys(data)
    .map(
      (key, _) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
};
