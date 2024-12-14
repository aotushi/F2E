import { useState,useRef } from 'react'
import {transform} from '@babel/standalone'

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // const [code, setCode] = useState('')

  const onClick = () => {
    if (!textareaRef.current) {
      return;
    }

    const res = transform(textareaRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'guang.tsx'
    })

    console.log(res.code);
    
  }

  const code = `import {useState, useEffect} from 'react'
    
    function App() {
      const [num, setNum] = useState(() => {
        const num1 = 1 + 2;
        const num2 = 2 + 3;
        return num1 + num2;
      })


      return (
        <div onClick={() => setNum(preNum => preNum + 1)}>{num}</div>
      )
    }

    export default App;
  
  `

  return (
    <div>
      <textarea ref={textareaRef} style={{width:'500px',height:'300px'}} defaultValue={code}></textarea>
      <button onClick={onClick}>编译</button>
    </div>
  )
}

export default App
