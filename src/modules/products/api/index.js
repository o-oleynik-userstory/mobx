/**
 * Апи.
 * @param {number} timeout Задержка
 * @return {any} Промис
 */
export class CounterApi {
    static request = (timeout) => {
        return new Promise((resolve) => {
            return setTimeout(() => {
                resolve(true);
            }, timeout);
        });
    };
}
