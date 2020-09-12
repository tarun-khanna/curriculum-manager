import React, { useState, createContext } from 'react';


const ITEMS = [
  {
    value: 'Numbers',
    children: [
      {
        value: 'Deserunt qui pariatur nisi tempor ipsum labore dolore.'
      },
    ]
  },
  {
    value: 'Measurement',
    children: [
      {
        value: 'Sint mollit est ea ullamco occaecat qui consequat.'
      },
      {
        value: 'Dolore exercitation est veniam proident pariatur ad ad.',
        children: [
          {
            value: 'Occaecat et consequat elit adipisicing est fugiat sint ullamco ut irure mollit incididunt.'
          }
        ]
      }
    ]
  }
]
export const CurriculumContext = createContext(null);

export const CurriculumProvider = ({ children }) => {
  const [curriculum, setCurriculum] = useState(ITEMS);

  const onIndent = () => {

  }

  const onOutdent = () => {

  }

  return (
    <CurriculumContext.Provider value={{ curriculum, setCurriculum, onIndent, onOutdent }}>
      {children}
    </CurriculumContext.Provider>
  )
}
