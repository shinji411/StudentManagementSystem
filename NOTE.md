# 笔记

## 编辑距离算法(Edit Distance)

### 介绍

编辑距离，又称`Levenshtein`距离（莱文斯坦距离也叫做`Edit Distance`），是指两个字串之间，由一个转成另一个所需的最少编辑操作次数，如果它们的距离越大，说明它们越是不同。许可的编辑操作包括将一个字符替换成另一个字符，插入一个字符，删除一个字符。

### 计算

对于 `1≤i≤N，1≤j≤M`，有公式一

若 `ai=bj`，则 `LD(i,j)=LD(i-1,j-1)`

若 `ai≠bj`，则 `LD(i,j)=Min(LD(i-1,j-1),LD(i-1,j),LD(i,j-1))+1`

计算 `LD(A,B)`

### 回溯差异

第一步：定位到(A,B)

第二步：取 Min[(i-1,j-1),(i,j-1),(i-1,j)]的位置\(优先级按照左上角、上边、左边的顺序\)

第三步：重复步骤二，直到回溯到(0,0)

若回溯到左上角单元格，将 ai 添加到匹配字串 A，将 bj 添加到匹配字串 B

若回溯到上边单元格，将 ai 添加到匹配字串 A，将\_添加到匹配字串 B

若回溯到左边单元格，将\_添加到匹配字串 A，将 bj 添加到匹配字串 B

### Reference

1. [文本对比。文本编辑距离算法](https://blog.csdn.net/zuokaopuqingnian/article/details/78343694)
2. [编辑距离算法（Edit Distance）](https://blog.csdn.net/chichoxian/article/details/53944188)
