import { Host } from "@/models/Service";
function ajaxPost(path, body) {
  return new Promise((resolve, reject) => {
    fetch(Host + path, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error_code != 0) {
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch(() => {
        reject({ error_code: -1, error_msg: "未知错误" });
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
        if (data.error_code == 0) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(() => {
        reject({ error_code: -1, error_msg: "未知错误" });
      });
  });
}
export default {
  ajaxPost,
  ajax
};
