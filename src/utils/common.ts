export const getSiteURL = () => {
  return (
    process.env.SITE_URL ||
    `https://${process.env.VERCEL_URL}` ||
    `https://localhost:${process.env.PORT}`
  );
};
