import {action, autorun, computed, makeObservable, observable, reaction, runInAction} from 'mobx';
import {CounterApi} from 'modules/cars/api';

/**
 * CarsStore
 */
class CarsStore {
    /**
     * Конструктор
     */
    constructor() {
        makeObservable(this, {
            asyncAwaitDecrease: action,
            asyncAwaitIncrease: action,
            asyncDecrease: action,
            asyncIncrease: action,
            decrease: action,
            doubleValue: computed,
            increase: action,
            status: observable,
            value: observable,
        });
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

    /**
     * Получить value * 2
     */
    get doubleValue() {
        console.log('get doubleValue');
        return this.value * 2;
    }

    increase = () => {
        this.value += 1;
    };
}

const carsStore = new CarsStore();

// const disposer = autorun((_reaction) => {
//     console.log('<-----autorun');
//     console.log('autorun reaction');
//     console.log(_reaction);
//     console.log('carsStore.value');
//     console.log(carsStore.value);
//     console.log('----->autorun');
// });

const disposer = reaction(
    () => carsStore.status,
    (currentValue, previousValue, _reaction) => {
        console.log('<-----reaction');
        console.log('currentValue');
        console.log(currentValue);
        console.log('previousValue');
        console.log(previousValue);
        console.log('reaction');
        console.log(_reaction);
        console.log('----->reaction');
    }
);

// disposer();

export default carsStore;

// const carsStoreInstance = new CarsStore();
//
// export const carsStore = makeObservable(carsStoreInstance, {
//     asyncAwaitDecrease: action,
//     asyncAwaitIncrease: action,
//     asyncDecrease: action,
//     asyncIncrease: action,
//     decrease: action,
//     increase: action,
//     status: observable,
//     value: observable,
// });
