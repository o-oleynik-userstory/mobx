import {action, makeAutoObservable, runInAction} from 'mobx';
import {CounterApi} from 'modules/cars/api';

/**
 * CarsStore
 */
class CarsStore {
    /**
     * Конструктор
     */
    constructor() {
        makeAutoObservable(this);
    }

    status = 'idle';
    value = 0;

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

    decrease = () => {
        this.value -= 1;
    };

    increase = () => {
        this.value += 1;
    };
}

export const carsStore = new CarsStore();
