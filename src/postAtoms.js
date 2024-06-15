import { atom, selectorFamily } from 'recoil';

export const postsState = atom({
  key: 'postsState',
  default: {
    content: [],
    page: 1,
    totalPages: 1
  },
});

export const fetchPostsSelector = selectorFamily({
  key: 'fetchPostsSelector',
  get: (page) => async () => {
    const response = await fetch(`http://3.34.135.249/api/posts?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  },
});
