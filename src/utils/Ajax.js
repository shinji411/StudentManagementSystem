import { HOST as Host } from "@/models/service";
function ajaxPost(path, body) {
  return new Promise((resolve, reject) => {
    fetch(Host + path, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: typeof body == "string" ? body : parser(body)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status == "success") {
          resolve(data);
        } else {
          let d = { status: `${data.data.errMsg}(${data.data.errCode})` };
          reject(d);
        }
      })
      .catch(data => {
        console.error(data);
        reject({ status: "未知错误" });
      });
  });
}
function ajax(path) {
  return new Promise((resolve, reject) => {
    fetch(Host + path, {
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status == "success") {
          resolve(data.data);
        } else {
          let d = { status: `${data.data.errMsg}(${data.data.errCode})` };
          reject(d);
        }
      })
      .catch(data => {
        console.error(data);
        reject({ status: "未知错误" });
      });
  });
}
function parser(obj) {
  let str = "";
  let length = Object.keys(obj).length,
    i = 0;
  for (const key in obj) {
    str += `${key}=${obj[key]}`;
    ++i < length && (str += "&");
  }
  return str;
}
export { ajaxPost, ajax };
