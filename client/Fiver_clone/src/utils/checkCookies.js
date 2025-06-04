
export const isRefreshTokenAvailable = () => {
  return document.cookie.includes("refreshToken"); 
  
};
