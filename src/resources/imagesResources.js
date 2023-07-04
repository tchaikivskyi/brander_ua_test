import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
  });
  

export async function fetchImages(value, limit, page) {
    return await instance(`photos?q=${value}&_limit=${limit}&_page=${page}`)
}

// import axios from "axios";

// const instance = axios.create({
//     baseURL: 'https://pixabay.com/api/'
//   });
  

// export async function fetchImages(value, limit, page) {
//     return await instance(`/?q=${value}&image_type=photo&orientation=horizontal&safesearch=true&key=31754694-dbfcbb04bb6ff6c5ba99a7a93&page=${page}&per_page=24`)
// }

