import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('paginationStore', {
    state: () => ({
        currentPage: 1,
        data: null,
        actionMovies: null,
        thrillerMovies: null,
        horrorMovies: null,
        adventureMovies: null,
        isLoading: false,
    }),
    actions: {
        async fetchData(page) {
            this.isLoading = true;
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=4e012d6a950f5501f23ee3e7f1e548d4&language=en-US&page=${page}`;
            const actionMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=4e012d6a950f5501f23ee3e7f1e548d4&with_genres=28";
            const thrillerMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=4e012d6a950f5501f23ee3e7f1e548d4&with_genres=53"
            const horrorMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=4e012d6a950f5501f23ee3e7f1e548d4&with_genres=27"
            const adventureMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=4e012d6a950f5501f23ee3e7f1e548d4&with_genres=12"

            try {
                const response = await fetch(url);
                const result = await response.json();
                this.data = result;

                const responseAction = await fetch(actionMoviesUrl);
                const resultAction = await responseAction.json();
                this.actionMovies = resultAction;

                const responseThriller = await fetch(thrillerMoviesUrl);
                const resultThriller = await responseThriller.json();
                this.thrillerMovies = resultThriller;

                const responseHorror = await fetch(horrorMoviesUrl);
                const resultHorror = await responseHorror.json();
                this.horrorMovies = resultHorror;

                const responseAdventure = await fetch(adventureMoviesUrl);
                const resultAdventure = await responseAdventure.json();
                this.adventureMovies = resultAdventure;
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
