import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { flushSync } from 'react-dom';

function App() {
    const [count, setCount] = useState(0);
    let handleOnClick = () => {
        // 第一种方式 执行了两次console.log, 但count只增加了1
        // setCount(count + 1);
        // setCount(count + 1);

        // 第二种方式 执行了两次console.log, 但count增加了2
        // setCount(() => count + 1);
        // setCount(() => count + 1);

        //第三种方式, 执行了两次console.log, count增加了1
        // setTimeout(() => {
        //     setCount(count + 1);
        //     setCount(count + 1);
        // });

        // 同步更新使用flushSync
        flushSync(() => {
            setCount(() => count + 1);
            setCount(() => count + 1);
        });

        // 同步更新使用flushSync 2
        flushSync(() => {
            setCount(() => count + 1);
            setCount(() => count + 1);
        });
    };
    console.log('render');
    return (
        <div>
            <p>数值是: {count}</p>
            <button onClick={handleOnClick}>函数调用{count}</button>
        </div>
    );
}

export default App;
