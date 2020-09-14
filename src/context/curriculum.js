import React, { useState, useContext, createContext } from 'react';

import { SnackbarContext } from './snackbar'
import {
  deepClone, getEle, getNodesAtLevel, insertEle, removeEle, swap
} from '../utilities';
import { SNACK_TYPE } from '../utilities/constants';

export const CurriculumContext = createContext(null);

const defaultCurriculum = {
  children: []
};

export const CurriculumProvider = ({ children }) => {
  const [curriculum, setCurriculum] = useState(defaultCurriculum);
  const { showSnackbar } = useContext(SnackbarContext)

  const onIndent = (path) => {
    const pathArr = path.split('.');
    const activeIndex = +pathArr[pathArr.length - 1];

    if (activeIndex === 0) {
      showSnackbar('Indentation not possible', SNACK_TYPE.FAILURE);
      return;
    }
    const curriculumCopy = deepClone(curriculum);

    // finding prevSibling path
    pathArr[pathArr.length - 1] = `${activeIndex - 1}`;
    const prevSiblingPath = pathArr.join('.');

    const activeData = getEle(curriculum, path);
    let updatedCurriculum = insertEle(curriculumCopy, activeData, prevSiblingPath);
    updatedCurriculum = removeEle(updatedCurriculum, path)

    setCurriculum(updatedCurriculum);
  }

  const onOutdent = (path) => {
    const pathArr = path.split('.');

    if (pathArr.length === 1) {
      showSnackbar('Outdentation not possible', SNACK_TYPE.FAILURE);
      return;
    }
    const curriculumCopy = deepClone(curriculum);

    // finding parent path
    pathArr.pop();
    const parentIndex = +pathArr.pop();
    const grandParentPath = pathArr.join('.');

    const activeData = getEle(curriculum, path);
    let updatedCurriculum = insertEle(curriculumCopy, activeData, grandParentPath, parentIndex + 1);
    updatedCurriculum = removeEle(updatedCurriculum, path)

    setCurriculum(updatedCurriculum);
  }

  const onMoveUp = (path) => {
    let curriculumCopy = deepClone(curriculum);

    const pathArr = path.split('.');
    const prevSibPathArr = path.split('.');
    prevSibPathArr[prevSibPathArr.length - 1] = +prevSibPathArr[prevSibPathArr.length - 1] - 1;
    const prevSibling = getEle(curriculumCopy, prevSibPathArr.join('.'));

    if (prevSibling) {
      /* If previous sibling exists, swap */
      curriculumCopy = swap(curriculumCopy, pathArr.join('.'), prevSibPathArr.join('.'));
    } else {
      /* Else, move the element to parent's previous sibling */
      pathArr.pop();
      const level = pathArr.length;

      const parentsArr = [];
      getNodesAtLevel(curriculumCopy, level, (obj) => parentsArr.push(obj));

      const parentEleId = getEle(curriculumCopy, pathArr.join('.')).id;
      /* Finding parent's previous sibling */
      const prevParentIndex = parentsArr.findIndex((ele) => ele.id === parentEleId) - 1;
      if (prevParentIndex === -1) {
        showSnackbar('no suitable parent up the line', SNACK_TYPE.FAILURE);
        return;
      }
      const prevParent = parentsArr[prevParentIndex];
      const activeElement = getEle(curriculumCopy, path);

      /* Inserting element at new position */
      if (prevParent.children) {
        prevParent.children.push(activeElement)
      } else {
        prevParent.children = [activeElement];
      }

      /* Removing element from old position */
      curriculumCopy = removeEle(curriculumCopy, path);
    }
    setCurriculum(curriculumCopy);
  }

  const onMoveDown = (path) => {
    let curriculumCopy = deepClone(curriculum);

    const pathArr = path.split('.');
    const nextSibPathArr = path.split('.');
    nextSibPathArr[nextSibPathArr.length - 1] = +nextSibPathArr[nextSibPathArr.length - 1] + 1;
    const nextSibling = getEle(curriculumCopy, nextSibPathArr.join('.'));

    if (nextSibling) {
      /* If next sibling exists, swap */
      curriculumCopy = swap(curriculumCopy, pathArr.join('.'), nextSibPathArr.join('.'));
    } else {
      /* Else, move the element to parent's next sibling */
      pathArr.pop();
      const level = pathArr.length;

      const parentsArr = [];
      getNodesAtLevel(curriculumCopy, level, (obj) => parentsArr.push(obj));

      const parentEleId = getEle(curriculumCopy, pathArr.join('.')).id;
      const nextParentIndex = parentsArr.findIndex((ele) => ele.id === parentEleId) + 1;
      if (nextParentIndex >= parentsArr.length) {
        showSnackbar('no suitable parent down the line', SNACK_TYPE.FAILURE);
        return;
      }
      const nextParent = parentsArr[nextParentIndex];

      const activeElement = getEle(curriculumCopy, path)

      /* Inserting element at new position */
      if (nextParent.children) {
        nextParent.children.unshift(activeElement)
      } else {
        nextParent.children = [activeElement];
      }

      /* Removing element from old position */
      curriculumCopy = removeEle(curriculumCopy, path);
    }
    setCurriculum(curriculumCopy);
  }

  /* Updating input fields (onChange) */
  const onUpdate = (path, value) => {
    const curriculumCopy = deepClone(curriculum);
    const activeData = getEle(curriculumCopy, path);
    activeData.value = value;
    setCurriculum(curriculumCopy);
  }

  /* Adding new element to curriculum */
  const onAdd = (data) => {
    const curriculumCopy = deepClone(curriculum);
    const updatedCurriculum = insertEle(curriculumCopy, data, '');
    setCurriculum(updatedCurriculum);
  }

  /* Removing element from curriculum */
  const onRemove = (path) => {
    const curriculumCopy = deepClone(curriculum);
    const updatedCurriculum = removeEle(curriculumCopy, path);
    setCurriculum(updatedCurriculum);
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
        onMoveDown,
        onUpdate,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  )
};