import memoryService from "./memoryService.js";

const buildPostFetchOptions = (body) => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + memoryService.getLocalValue("JWT_TOKEN")
  }
});
const buildDeleteFetchOptions = (body) => ({
  method: "DELETE",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + memoryService.getLocalValue("JWT_TOKEN")
  }
});
const buildPutFetchOptions = (body) => ({
  method: "PUT",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + memoryService.getLocalValue("JWT_TOKEN")
  }
});

const buildGetFetchOptions = () => ({
  headers: {
    "Authorization": "Bearer " + memoryService.getLocalValue("JWT_TOKEN")
  }
});

const performRequest = async (url, method, body) => {
  let options = undefined;

  if(method === "GET") {
    options = buildGetFetchOptions();
  }
  else if(method === "POST") {
    options = buildPostFetchOptions(body);
  } else if(method === "DELETE") {
    options = buildDeleteFetchOptions(body);
  } else if(method === "PUT") {
    options = buildPutFetchOptions(body);
  }
  
  return await fetch(url, options);
}

async function getUsers() {
    let resp = await performRequest("http://127.0.0.1:3000/admin/users", "GET");
    let data = await resp.json();

    return data;
  }

async function promoteUser(body) {
  let resp = await performRequest("http://127.0.0.1:3000/admin/users", "PUT", body);
  let data = await resp.json();

  return data;
}

async function deleteUser(username) {
  let resp = await performRequest("http://127.0.0.1:3000/admin/users", "DELETE", username);
  let data = await resp.json();

  return data;
}

async function editBook(body) {
    let resp = await performRequest("http://127.0.0.1:3000/library/admin/books", "PUT", body);
    let data = await resp.json();
  
    return data;
}

async function deleteBook(body) {
    let resp = await performRequest("http://127.0.0.1:3000/library/admin/books", "DELETE", body);
    let data = await resp.json();
  
    return data;
}


/* helper function (not exported), used to parse local jwt token from localStorage */
function getLocalJWTData() {
  const localJWTToken = memoryService.getLocalValue('JWT_TOKEN');
  const tokenParts = localJWTToken.split('.'); // 0 - jwt header, 1 - payload, 2 - signatur
  const payload = tokenParts[1];

  let payloadData = window.atob(payload);
  return JSON.parse(payloadData);
}



const userService = { promoteUser, deleteUser, getUsers, editBook, deleteBook };
export default userService;
