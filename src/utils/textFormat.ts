export const formatTextEllipsis = (text: string, length: number) => {
  if (text.length <= length) return text;
  const formatText = text.slice(0, length) + "...";
};
