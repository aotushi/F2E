import { createStore } from "vuex";
// import App from "../App.vue";
import user from './user';

const store = createStore({
	state() {
		return {
			count: 0,
		};
	},
	mutations: {
		increment(state) {
			state.count++;
		},
	},
	modules: {
		user
	}
});
export default store;
// const app = createApp(App);
// app.use(store);
