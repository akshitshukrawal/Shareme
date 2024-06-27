

// Example fetchUser function
export const fetchUser = () => {
    const userInfo = localStorage.getItem('user');
    if(userInfo !== 'undefined'){
      return JSON.parse(userInfo);
    }else{
      (localStorage.clear());
      console.log('no user found akshit');
    }
  };
  