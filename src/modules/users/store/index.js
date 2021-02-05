import {makeAutoObservable} from 'mobx';

/**
 * ProductsStore
 */
class UsersStore {
    /**
     * Конструктор
     */
    constructor() {
        makeAutoObservable(this);
    }

    value = 0;

    decrease = () => {
        this.value -= 1;
    };

    increase = () => {
        this.value += 1;
    };
}

export const usersStore = new UsersStore();
