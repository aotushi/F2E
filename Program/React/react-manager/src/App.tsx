import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '河畔一角', age: 30 });
  const [list, setList] = useState(['tom', 'jack', 'lucy']);

  const updateUser = () => setUser({ ...user, age: 50 });
  const handleList = () => {
    // setList([...list, 'rose']);
    // list.push('rose'); 不合法的写法
  };
  const handleCount = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // setTimeout(() => {
    //   setCount(count + 1);
    //   setCount(count + 1);
    //   setCount(count + 1);
    //   setCount(count + 1);
    // });
    setCount(() => {
      count + 1;
      count + 1;
      count + 1;
      count + 1;
      return count + 1;
    });
  };

  return (
    <div className='App'>
      <p>欢迎学习react后台管理</p>
      <p>count: {count}</p>
      <p>
        <span>用户名称: {user.name}</span> <span>用户年龄: {user.age}</span>
      </p>
      <p>
        {list.map(item => {
          return (
            <span key={item} style={{ marginRight: 10 }}>
              {item}
            </span>
          );
        })}
      </p>
      <p>
        <button onClick={handleCount}>点击按钮修改值</button>
        <button onClick={updateUser}>修改名称</button>
        <button onClick={handleList}>新增用户</button>
      </p>
    </div>
  );
}

export default App;
