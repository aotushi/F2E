import router from "@/router";
import axios from "axios";
import config from "~/config";

axios.defaults.baseURL = config[import.meta.env.MODE].baseURL;

axios.defaults.withCredentials = true;

axios.defaults.headers["X-Requested-with"] = "XMLHttpRequest";
axios.defaults.headers["token"] = localStorage.getItem("token") || "";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
	if (typeof res.data !== "object") {
		alert("服务端异常");
		return Promise.reject(res);
	}
	if (res.data.resultCode !== 200) {
		if (res.data.message) alert(res.data.message);
		if (res.data.resultCode == 419) {
			router.push({ path: "/login" });
		}
		return Promise.reject(res.data);
	}
	return res.data.data;
});

export default axios;
