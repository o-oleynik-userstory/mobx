import {observer} from 'mobx-react';
import {CatsSum} from 'modules/cats/components/CatsSum';
import {catsStore} from 'modules/cats/store';
import React from 'react';
import './style.less';

/**
 * Cats
 * @returns {*} Представление
 */
export const Cats = observer(() => {
    const {asyncDecrease, asyncIncrease, asyncAwaitDecrease, asyncAwaitIncrease, decrease, increase, status, value} = catsStore;
    console.log('render Cats');
    return (
        <div className="cats">
            <h4>Cats</h4>
            <div className="cats__content">
                <p>
                    <b>Status</b> {status}
                </p>
            </div>
            <div className="cats__content-area">
                <h6>sync</h6>
                <div className="cats__content">
                    <button className="cats__button" onClick={decrease}>
                        -
                    </button>
                    <span className="cats__value">{value}</span>
                    <button className="cats__button" onClick={increase}>
                        +
                    </button>
                </div>

                <h6>async</h6>
                <div className="cats__content">
                    <button className="cats__button" onClick={asyncDecrease}>
                        -
                    </button>
                    <span className="cats__value">{value}</span>
                    <button className="cats__button" onClick={asyncIncrease}>
                        +
                    </button>
                </div>

                <h6>asyncAwait</h6>
                <div className="cats__content">
                    <button className="cats__button" onClick={asyncAwaitDecrease}>
                        -
                    </button>
                    <span className="cats__value">{value}</span>
                    <button className="cats__button" onClick={asyncAwaitIncrease}>
                        +
                    </button>
                </div>
            </div>
            <div className="cats__sum-container">
                <CatsSum />
            </div>
        </div>
    );
});
