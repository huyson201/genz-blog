export const calcBlogReadingTime = (data: string, avgWordsPerMin: number) => {
  const wordCount = getWordCount(data);
  return Math.ceil(wordCount / avgWordsPerMin);
};

function getWordCount(data: string) {
  const result = data.match(/\w+/g);
  return result ? result.length : 0;
}
