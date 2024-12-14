// import {useEffect} from 'react'
import { transform } from "@babel/standalone";
import type { PluginObj } from "@babel/core";

function App() {
  const code1 = `
    function add(a,b) {
      return a + b
    }

    export { add }
  `;

  const url = URL.createObjectURL(new Blob([code1], { type: "application/javascript" }));

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      },
    },
  };

  const code2 = `import {add} from './add.ts';console.log(add(2,2))`;

  const onclick = () => {
    const res = transform(code2, {
      presets: ["react", "typescript"],
      filename: "guang.ts",
      plugins: [transformImportSourcePlugin],
    });
    console.log(res);
  };

  return (
    <div>
      <button onClick={onclick}>编译</button>
    </div>
  );
}

export default App;
