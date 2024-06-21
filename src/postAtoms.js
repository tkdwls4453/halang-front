import { atom, selectorFamily } from 'recoil';
import config from './config';
import axios from 'axios';

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
    const response = await fetch(`${config.apiBaseUrl}/api/posts?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  },
});

export const adminPostsState = atom({
  key: 'adminPostsState',
  default: []
})

export const pageState = atom({
  key: 'pageState',
  default: 1
});

export const imagesState = atom({
  key: 'imagesState',
  default: []
});

export const fetchImagesSelector = selectorFamily({
  key: 'fetchImagesSelector',
  get:(params) => async () => {
    const { page, postId } = params;
    const response = await axios.get(`${config.apiBaseUrl}/api/post/${postId}?page=${page}`)
    return response.data.data;
  }
});