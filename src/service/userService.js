import memoryService from "./memoryService.js";

const buildPostFetchOptions = (body) => ({
  method: "POST",
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
  }
  
  return await fetch(url, options);
}


async function getBooks() {
  let resp = await performRequest("http://127.0.0.1:3000/library/books", "GET");
  let data = await resp.json();

  return data;
}

async function addBook(body) {
  let resp = await performRequest("http://127.0.0.1:3000/library/user/books", "POST", body);
  let data = await resp.json();

  return data;
}

async function getUser() {
  let resp = await performRequest("http://127.0.0.1:3000/library/profile", "GET");

  return resp;
}

// async function getDebitCard() {
//   let resp = await performRequest("http://127.0.0.1:4000/user/debitCard", "GET");
//   let data = await resp.json()

//   return data.debitCard;
// }

// async function getAddress() {
//   let resp = await performRequest("http://127.0.0.1:4000/user/address", "GET");
//   let data = await resp.json();

//   return data.address;
// }

// async function getHistory() {
//   let resp = await performRequest("http://127.0.0.1:4000/user/history", "GET");

//   return resp;
// }

/* helper function (not exported), used to parse local jwt token from localStorage */
function getLocalJWTData() {
  const localJWTToken = memoryService.getLocalValue('JWT_TOKEN');
  const tokenParts = localJWTToken.split('.'); // 0 - jwt header, 1 - payload, 2 - signatur
  const payload = tokenParts[1];

  let payloadData = window.atob(payload);
  return JSON.parse(payloadData);
}

function getUsername() {
  return getLocalJWTData().username;
}


const userService = { getBooks, getUsername, getUser, addBook };
export default userService;
