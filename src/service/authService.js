/**
 * 
Authentication service. 
Exporting functions for authenticated users such as registering new user and logging out a user.
*/

const buildFetchOptions = (body) => ({
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
});

const performRequest = async (url, body) => {
  const options = buildFetchOptions(body);
  let resp = await fetch(url, options);
  
  return resp;
}


async function authenticate(credential) {
  let resp = await performRequest("http://127.0.0.1:3000/auth/login", credential);
    
  return resp;
}

async function register(credential) {
  let resp = await performRequest("http://127.0.0.1:3000/auth/register", credential);

  return resp;
}


const isAuthenticated = () => localStorage.getItem('JWT_TOKEN') !== null;

const logOut = () => localStorage.removeItem('JWT_TOKEN')

const authService = { authenticate, register, isAuthenticated, logOut };
export default authService;
