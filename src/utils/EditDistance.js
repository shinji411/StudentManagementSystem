function getMatrix(str1, str2) {
  let a = str1.length,
    b = str2.length;
  const matrix = [];
  for (let i = 0; i <= a; i++) {
    matrix.push(new Array(b + 1));
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b; j++) {
    matrix[0][j] = j;
  }
  let i = 1,
    j = 1;
  for (; i <= a; i++) {
    for (j = 1; j <= b; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
      }
    }
  }
  return matrix;
}
//str1修改后，str2原文本
function formatStr(str1, str2) {
  let matrix = getMatrix(str1, str2);
  let i = str1.length,
    j = str2.length,
    index = 0;
  let dom = [];
  let buffer = {
    type: "",
    text: ""
  };
  //console.log(matrix);
  while (i > 0 && j > 0) {
    let d = matrix[i - 1][j - 1],
      l = matrix[i][j - 1],
      t = matrix[i - 1][j],
      s = "",
      ls = "";
    let type = "",
      open = false,
      add = true;
    //console.info(`i:${i} j:${j}`);
    if (str1[i - 1] == str2[j - 1]) {
      type = "equal";
      s = str1[i - 1];
      i--, j--;
      open = true;
    } else if (d <= l && d <= t) {
      type = "different";
      s = str1[--i];
      buffer.type != type ? ((open = true), (ls = str2[j - 1])) : (buffer.text = str2[j - 1] + buffer.text);
      j--;
    } else if (t <= l && t <= d) {
      type = "add";
      s = str1[--i];
      open = true;
    } else {
      type = "delete";
      s = str2[--j];
      buffer.type != type ? (open = true) : (buffer.text = s + buffer.text);
      add = false;
    }

    if (open) {
      if (buffer.text != "") {
        dom.splice(0, 0, { id: index++, type: "delete", word: buffer.text });
        buffer.text = "";
        buffer.type = "";
      } else if (type == "different" || type == "delete") {
        buffer.type = type;
        buffer.text = type == "different" ? ls : s;
      }
    }
    //console.log(`d:${d} l:${l} t:${t} result:${type} str:${s} str2:${ls}`);
    //console.warn(`i:${i} j:${j}`);
    if (add) {
      dom.splice(0, 0, { id: index++, type: type, word: s });
    }
    if ((j == 0 || i == 0) && buffer.text != "") {
      dom.splice(0, 0, { id: index++, type: "delete", word: buffer.text });
      buffer.text = "";
    }
    if (j == 0 && i != 0) {
      dom.splice(0, 0, { id: index++, type: "add", word: str1.slice(0, i) });
    } else if (i == 0 && j != 0) {
      dom.splice(0, 0, { id: index++, type: "delete", word: str2.slice(0, j) });
    }
  }
  //console.log(str1, str2, dom);
  return dom;
}
export default formatStr;
