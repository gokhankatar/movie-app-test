import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('paginationStore', {
    state: () => ({
        currentPage: 1,
        data: null,
        isLoading: false,
    }),
    actions: {
        async fetchData(page) {
            this.isLoading = true;
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=4e012d6a950f5501f23ee3e7f1e548d4&language=en-US&page=${page}`;

            try {
                const response = await fetch(url);
                const result = await response.json();
                this.data = result;
            } catch (error) {
                console.error('API request failed:', error);
            } finally {
                this.isLoading = false;
            }
        },
        setCurrentPage(page) {
            this.currentPage = page;
            this.fetchData(page);
        }
    },
    persist: true,
});
