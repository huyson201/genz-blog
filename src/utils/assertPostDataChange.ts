import { Post, PostFormData } from "@/types/type";

export const assertPostDataChange = (postData: PostFormData, post: Post) => {
  if (
    postData.content === post.content &&
    postData.description === post.description &&
    postData.title === post.title &&
    postData.display === post.display &&
    postData.hashtags.every((tagData) =>
      post.hashtags.some(
        (tag) => tag.name.toLowerCase() === tagData.toLowerCase()
      )
    )
  ) {
    return false;
  }

  return true;
};
