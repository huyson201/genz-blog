export const removeDuplicateObj = <T extends { _id: string }>(data: T[]) => {
  const seen = new Set();
  return data.filter((value) => {
    const id = value._id;
    if (!seen.has(id)) {
      seen.add(id);
      return true;
    }

    return false;
  });
};
