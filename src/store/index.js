import { createStore } from "vuex";
import postModule from "./postStoreModule"

export default createStore({
    modules: {
        posts: postModule
    }
})