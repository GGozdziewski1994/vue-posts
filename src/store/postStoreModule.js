const API_URL = import.meta.env.VITE_API_URL;

export default {
    state: () =>   ({
        posts: {
            pageSize: 10,
            currentPage: 1,
            data: []
        },
        users: [],
    }),
    getters: {
        postPage: (state) => {
            const from = state.posts.pageSize * (state.posts.currentPage - 1);
            const to = from + state.posts.pageSize;
            return state.posts.data.slice(from, to);
        },
        postPageCount: (state) => {
            return Math.floor(state.posts.data.length / state.posts.pageSize);
        },
        currentPostPage: state => state.posts.currentPage
    },
    mutations: {
        setPost(state, payload) {
            state.posts.data = payload;
        },
        setPage(state, index){
            state.posts.currentPage = index;
        },
        setUsers(state, payload){
            const users = payload;
            const userMap = Object.fromEntries(users.map(user => [user.id, user]));
            const posts = state.posts.data;
            const postsWithUsers = posts.map(post => {
                return {
                    ...post,
                    author: userMap[post.userId]
                }
            })
            state.posts.data = postsWithUsers
        },
        removePost(state, postId){
            state.posts.data = state.posts.data.filter(post => post.id !== postId)
        }
    },
    actions: {
        fetchData: async(context) => {
            await context.dispatch('fetchPosts');
            await context.dispatch('fetchPostAuthors');
        },
        fetchPosts: async (context) => {
            const fetchPostsRequest = await fetch(API_URL  + '/posts');
            const posts = await fetchPostsRequest.json();
            context.commit('setPost', posts)
        },
        fetchPostAuthors: async (context, payload) => {
            const fetchPostsRequest = await fetch(API_URL  + '/users');
            const users = await fetchPostsRequest.json();
            context.commit('setUsers', users)
        }
    }
}