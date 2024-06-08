import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    /**
     * 1
     */
    // 模拟mounted
    // useEffect(() => {
    //     document.title = '更新: react后台管理课程';
    // });

    // 模拟渲染后会更新count值
    useEffect(() => {
        console.log('a', count);
        setCount(count + 1);
    }, []);

    /**
     * 2 依赖项count更新后,total才更新
     */
    // 依赖项更新, 执行
    // useEffect(() => {
    //     console.log('useEffect>>setTotal', count);
    //     setTotal(count * 2);
    // }, [count]);

    /**
     * 3 定时器模拟页面销毁
     */

    // 添加循环定时器,不断变化
    // setInterval(() => {
    //     console.log('c', count);
    //     debugger;
    //     setCount(count + 1);
    // }, 1000);

    // 添加空依赖项后, 没有变化

    // useEffect(() => {
    //     console.log('b', count);
    //     setInterval(() => {
    //         // 此处的count始终是0
    //         console.log('c', count);
    //         setCount(count + 1);
    //     }, 1000);
    // }, []);

    // useEffect(() => {
    //     const T = setInterval(() => {
    //         console.log('setInterval>>count', count);
    //         setCount(count => count + 1);
    //     }, 1000);

    //     return () => {
    //         clearInterval(T);
    //     };
    // });
    return (
        <div>
            <p>欢迎学习react课程</p>
            <p>
                count值 {count}, Total: {total}
            </p>
        </div>
    );
}

export default App;
