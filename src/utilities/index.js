export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export const getEle = (curriculum, path) => {
  return path === '' ? curriculum : path.split('.').reduce((o, key) => (o && o.children[key] ? o.children[key] : null), curriculum);
}

export const removeEle = (curriculum, path) => {
  const pathArr = path.split('.');
  const activeIndex = pathArr.pop();
  const parent = getEle(curriculum, pathArr.join('.'));
  parent.children.splice(activeIndex, 1);
  return curriculum;
}

export const insertEle = (curriculum, data, parentPath, pos = null) => {
  const parent = getEle(curriculum, parentPath);
  debugger;
  if (parent.children) {
    if (pos) parent.children.splice(pos, 0, data);
    else parent.children.push(data);
  } else parent.children = [data]
  return curriculum;
}

export const swap = (curriculum, pathA, pathB) => {
  const pathArr = pathA.split('.');
  const aIndex = pathArr.pop();
  const bIndex = pathB.split('.').pop();
  const parentPath = pathArr.join('.');
  const parent = getEle(curriculum, parentPath);

  // swap algo
  const temp = parent.children[aIndex];
  parent.children[aIndex] = parent.children[bIndex];
  parent.children[bIndex] = temp;

  return curriculum;
}

export const findLastChildIndex = (curriculum, path) => {
  const ele = getEle(curriculum, path);
  debugger;
  if (ele && ele.children) {
    return ele.children.length - 1;
  }
  return -1;
}