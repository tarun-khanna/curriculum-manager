import React, { useState, createContext } from 'react';
import { deepClone, findLastChildIndex, getEle, insertEle, removeEle, swap } from '../utilities';

export const CurriculumContext = createContext(null);

export const CurriculumProvider = ({ children }) => {
  const [curriculum, setCurriculum] = useState({
    children: []
  });

  const onIndent = (path) => {
    const pathArr = path.split('.');
    const activeIndex = pathArr[pathArr.length - 1];

    if (activeIndex === '0') {
      alert('not possible');
      return;
    }
    const curriculumCopy = deepClone(curriculum);

    // finding prevSibling path
    pathArr[pathArr.length - 1] = +activeIndex - 1;
    const prevSiblingPath = pathArr.join('.');

    const activeData = getEle(curriculum, path);
    let updatedCurriculum = insertEle(curriculumCopy, activeData, prevSiblingPath);
    updatedCurriculum = removeEle(updatedCurriculum, path)

    setCurriculum(updatedCurriculum);
  }

  const onRemove = (path) => {
    const curriculumCopy = deepClone(curriculum);
    const updatedCurriculum = removeEle(curriculumCopy, path)
    setCurriculum(updatedCurriculum);
  }

  const onOutdent = (path) => {
    const pathArr = path.split('.');

    if (pathArr.length === 1) {
      alert('not possible');
      return;
    }
    const curriculumCopy = deepClone(curriculum);

    // finding parent path
    pathArr.pop();
    const prevParent = pathArr.pop();
    const newParentPath = pathArr.join('.');

    const activeData = getEle(curriculum, path);
    let updatedCurriculum = insertEle(curriculumCopy, activeData, newParentPath, +prevParent + 1);
    updatedCurriculum = removeEle(updatedCurriculum, path)

    setCurriculum(updatedCurriculum);
  }

  const onUpdate = (path, value) => {
    const curriculumCopy = deepClone(curriculum);
    const activeData = getEle(curriculumCopy, path);
    activeData.value = value;
    setCurriculum(curriculumCopy);
  }

  const onAdd = (data) => {
    const curriculumCopy = deepClone(curriculum);
    const updatedCurriculum = insertEle(curriculumCopy, data, '');
    setCurriculum(updatedCurriculum);
  }


  const onMoveUp = (path) => {
    const pathArr = path.split('.');
    const activeIndex = +pathArr[pathArr.length - 1];

    const curriculumCopy = deepClone(curriculum);
    let updatedCurriculum;

    if (activeIndex !== 0) {
      // moving up withing same level among children of parent
      const pathArrB = [...pathArr];
      pathArrB[pathArrB.length - 1] = activeIndex - 1
      updatedCurriculum = swap(curriculumCopy, pathArr.join('.'), pathArrB.join('.'))
    } else {
      if (pathArr.every((item) => +item === 0)) {
        alert('not possible');
        return;
      }

      // moving up to previous parent


      pathArr.pop(); // to get to parent level
      const reversedPathArr = [...pathArr].reverse();
      const level = reversedPathArr.findIndex(item => +item !== 0);

      pathArr.splice(-level, level);
      pathArr[pathArr.length - 1] = pathArr[pathArr.length - 1] - 1;
      // pathArr.splice(-level - 1, 1, )
      let newParentPath = pathArr.join('.');
      for (let i = 0; i < level; ++i) {
        debugger;
        const lastChildIndex = findLastChildIndex(curriculumCopy, newParentPath);
        if (lastChildIndex === -1) {
          alert('not possible');
          return;
        }
        newParentPath = newParentPath + '.' + lastChildIndex;
      }




      // const parentIndex = +pathArr[pathArr.length - 1];


      // pathArr[pathArr.length - 1] = parentIndex - 1
      // const newParentPath = pathArr.join('.');
      debugger;
      const activeData = getEle(curriculumCopy, path);
      updatedCurriculum = insertEle(curriculumCopy, activeData, newParentPath);
      updatedCurriculum = removeEle(updatedCurriculum, path);




    }
    setCurriculum(updatedCurriculum)
  }

  return (
    <CurriculumContext.Provider
      value={{
        curriculum,
        setCurriculum,
        onRemove,
        onIndent,
        onOutdent,
        onAdd,
        onMoveUp,
        onUpdate
      }}
    >
      {children}
    </CurriculumContext.Provider>
  )
}







/* const obj = {
  children: [
    {
      "value": "Numbers",
      "children": [
        {
          "value": "Deserunt qui pariatur nisi tempor ipsum labore dolore."
        }
      ]
    },
    {
      "value": "Measurement",
      "children": [
        {
          "value": "Sint mollit est ea ullamco occaecat qui consequat."
        },
        {
          "value": "Dolore exercitation est veniam proident pariatur ad ad.",
          "children": [
            {
              "value": "Occaecat et consequat elit adipisicing est fugiat sint ullamco ut irure mollit incididunt."
            }
          ]
        }
      ]
    }
  ]
} */