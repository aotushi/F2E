import { v4 as uuidv4 } from "uuid";

// 用来生成用户临时标识  uuid依赖包已经安装完
export const getUserTempId = () => {
	// 1.先从localStorage中获取用户临时标识
	let userTempId = localStorage.getItem("USERTEMPID_KEY");

	// 2.如果取到了,直接返回使用

	// 3.如果没有获取到,再通过uuid重新创建,并且存储到localStorage

  if (!userTempId) {
    userTempId = uuidv4()
    localStorage.setItem('USERTEMPID_KEY', userTempId)
  }
  
  return userTempId
};
