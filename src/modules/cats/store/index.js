import {action, makeObservable, observable, runInAction} from 'mobx';
import {CounterApi} from 'modules/cars/api';

/**
 * CatsStore
 */
class CatsStore {
    /**
     * Конструктор
     */
    constructor() {
        makeObservable(this);
    }

    @observable status = 'idle';
    @observable value = 0;

    @action
    asyncDecrease = () => {
        this.status = 'pending';

        CounterApi.request(1000)
            .then(
                action('fetch success', (result) => {
                    if (result) {
                        this.value -= 1;
                        this.status = 'idle';
                    } else {
                        console.log('asyncDecrease result');
                        console.log(result);
                    }
                })
            )
            .catch(
                action('fetch error', (err) => {
                    this.status = 'idle';
                    console.log(err);
                })
            );
    };

    @action
    asyncIncrease = () => {
        this.status = 'pending';

        CounterApi.request(1000)
            .then(
                action('fetch success', (result) => {
                    if (result) {
                        this.value += 1;
                        this.status = 'idle';
                    } else {
                        console.log('asyncIncrease result');
                        console.log(result);
                    }
                })
            )
            .catch(
                action('fetch error', (err) => {
                    this.status = 'idle';
                    console.log(err);
                })
            );
    };

    @action
    asyncAwaitDecrease = async () => {
        this.status = 'pending';

        try {
            const result = await CounterApi.request(2000);

            if (result) {
                runInAction(() => {
                    this.value -= 1;
                });
            } else {
                console.log('asyncAwaitDecrease result');
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        } finally {
            runInAction(() => {
                this.status = 'idle';
            });
        }
    };

    @action
    asyncAwaitIncrease = async () => {
        this.status = 'pending';

        try {
            const result = await CounterApi.request(2000);

            if (result) {
                runInAction(() => {
                    this.value += 1;
                });
            } else {
                console.log('asyncAwaitIncrease result');
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        } finally {
            runInAction(() => {
                this.status = 'idle';
            });
        }
    };

    @action
    decrease = () => {
        this.value -= 1;
    };

    @action
    increase = () => {
        this.value += 1;
    };
}

export const catsStore = new CatsStore();
