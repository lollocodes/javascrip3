/* 
Admin service for handling API calls. 
Exporting functions that perform operations related to books and users.
*/

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

async function getUser(username) {
    let resp = await performRequest("http://127.0.0.1:3000/admin/users", "GET", username);
    let data = await resp.json();

    return data;
  }

async function promoteUser(body) {
  let resp = await performRequest("http://127.0.0.1:3000/admin/users", "PUT", body);
  console.log(resp.status)

  if (resp.status === 200) {
    let data = await resp.json();
    return data;
  }

}

async function deleteUser(body) {
  let resp = await performRequest("http://127.0.0.1:3000/admin/users", "DELETE", body);
  let data = await resp.json();

  return data;
}

async function editBook(body) {
    let resp = await performRequest("http://127.0.0.1:3000/admin/books", "PUT", body);
    let data = await resp.json();
  
    return data;
}

async function addBook(body) {
  let resp = await performRequest("http://127.0.0.1:3000/admin/books", "POST", body);
  let data = await resp.json();

  return data;
}

async function deleteBook(body) {
    let resp = await performRequest("http://127.0.0.1:3000/admin/books", "DELETE", body);
    let data = await resp.json();
  
    return data;
}

const userService = { promoteUser, deleteUser, getUsers, getUser, editBook, deleteBook, addBook };
export default userService;
