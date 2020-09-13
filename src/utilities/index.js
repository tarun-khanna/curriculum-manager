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

export const getNodesAtLevel = (obj, level, callback) => {
  if (level === 0) {
    callback(obj);
  } else if (obj && obj.children) {
    obj.children.forEach((child) => getNodesAtLevel(child, level - 1, callback))
  }
}