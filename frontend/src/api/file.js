// import { create } from "ipfs-http-client"
import { apiPost } from "./index";
// const client = create("http://localhost:5001/api/v0");

async function upload(file) {
  try {
    const result = await apiPost(`/api/file`, { file })
    console.log(result)
    // const added = await client.add(file);
    // const url = `http://127.0.0.1:8080/ipfs/${added.path}`;
    return Promise.resolve({url: result.path})
  } catch(error) {
    return Promise.reject(error)
  }
}

function getUrl() {
  try {
    return Promise.resolve({ data: '' });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function download(url, filename) {
  console.log('url', url)
  downloadUrl(url, filename);
}

function downloadUrl(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    })
    .catch(console.error);
}

export {
  upload,
  getUrl,
  download,
}