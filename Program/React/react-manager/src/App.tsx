import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    // const [count, setCount] = useState(0);
    const style = { color: 'red', fontSize: '22px' };
    let name = <span style={{ color: 'blue', fontSize: '50px' }}>Hello World!</span>;
    let list = ['tom', 'dick', 'jack', 'lily'];
    let inputValue = 'value22';
    let handleOnChange = (event: any) => {
        console.log('event', event);
    };
    let handleOnClick = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    };
    const [count, setCount] = useState(0);
    return (
        <div>
            {name}
            <p>用户列表</p>
            <p>
                {list.map(item => (
                    <div key={item}>{item}</div>
                ))}
            </p>
            <p>
                <input value={inputValue} onChange={handleOnChange}></input>
            </p>
            <button onClick={handleOnClick}>{count}</button>
        </div>
    );
}

export default App;
