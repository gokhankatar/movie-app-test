import { defineStore } from "pinia";

const store = defineStore("store", {
    state() {
        return {
            theme: 'dark'
        }
    },
    actions: {
        changeTheme() {
            this.theme === 'light'
                ? this.theme = 'dark'
                : this.theme = 'light'
        }
    },
    persist: true
});

export default store;