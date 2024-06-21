import axios from "axios";
import config from "../config"
import Cookies from 'js-cookie';

export const fetchAdminPosts = async () =>{
  const response = await fetch(`${config.apiBaseUrl}/api/admin/posts`)
  const data = await response.json();
  return data;
}

export const createAdminPost = async (postData) => {
  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append('description', postData.description);
  formData.append('represent', postData.mainImage[0]);
  Array.from(postData.portfolioImages).forEach((file) => {
    formData.append('images', file);
  });


  const response = await axios.post(`${config.apiBaseUrl}/api/post`, formData, {
    headers: {
      'Content-Type':'multipart/form-data',
      'Authorization': 'Bearer ' + Cookies.get('authToken')
    }
  });

  return response.data;
}

export const changeSequence = async (portfolios) => {
  // portfolios 배열에서 id와 sequence만 추출하여 새로운 배열로 변환
  const reducedPortfolios = portfolios.map(portfolio => ({
    id: portfolio.id,
    sequence: portfolio.sequence
  }));

  console.log(reducedPortfolios);

  const response = await axios.put(`${config.apiBaseUrl}/api/post/sequence`, reducedPortfolios, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('authToken')
    }
  });
  
  return response.data;
};

export const checkJwt = async () => {
  const formData = new FormData();
  formData.append('token', Cookies.get('authToken'));

  const response = await axios.post(`${config.apiBaseUrl}/check`, formData, {
    headers: {
      'Content-Type':'multipart/form-data'
    }
  });

  return response.data;
}

export const deletePost = async (post_id) => {
  const response = await axios.delete(`${config.apiBaseUrl}/api/post/${post_id}`, {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('authToken')
    }
  });

  return response.data;
}