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

async function orderBook(body) {
  let resp = await performRequest("http://127.0.0.1:3000/library/user/books", "POST", body);
  let data = await resp.json();

  return data;
}

async function getUser() {
  let resp = await performRequest("http://127.0.0.1:3000/library/profile", "GET");
  let data = await resp.json();
  
  console.log(data)
  return data;
}

async function search(endpoint, query) {
    let res = await performRequest(`http://127.0.0.1:3000/library/${endpoint}/search?q=${query}`, "GET");

    if (res.status === 200 ) {
      console.log(res)
      let data = await res.json();
      return data
    }
  }


/* helper function (not exported), used to parse local jwt token from localStorage */
function getLocalJWTData() {
  const localJWTToken = memoryService.getLocalValue('JWT_TOKEN');
  const tokenParts = localJWTToken.split('.'); // 0 - jwt header, 1 - payload, 2 - signatur
  const payload = tokenParts[1];

  let payloadData = window.atob(payload);
  return JSON.parse(payloadData);
}



const userService = { getBooks, getUser, addBook: orderBook, search };
export default userService;
