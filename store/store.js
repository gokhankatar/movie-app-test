import { defineStore } from "pinia";

const store = defineStore("store", {
    state() {
        return {
            theme: 'dark',
            apiKey: "D852KCZ!A1bC-9d8E_fGh7JKlM*N0PqRs-TuVWXYZaB3456C!D@G",
            isSpecialUser:false
        }
    },
    actions: {
        changeTheme() {
            this.theme === 'light'
                ? this.theme = 'dark'
                : this.theme = 'light'
        },
        setSpecialUser(){
            this.isSpecialUser = true;
        },
        setSpecialUserFalse(){
            this.isSpecialUser = false;
        },
    },
    persist: true
});

export default store;