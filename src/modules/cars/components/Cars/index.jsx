import {observer} from 'mobx-react';
import {CarsSum} from 'modules/cars/components/CarsSum';
import carsStore from 'modules/cars/store';
import React from 'react';
import './style.less';

/**
 * Cars
 * @returns {*} Представление
 */
export const Cars = observer(() => {
    const {asyncDecrease, asyncIncrease, asyncAwaitDecrease, asyncAwaitIncrease, decrease, increase, status, value} = carsStore;
    console.log('render Cars');
    return (
        <div className="cars">
            <h4>Cars</h4>
            <div className="cars__content">
                <p>
                    <b>Status</b> {status}
                </p>
            </div>
            <div className="cars__content-area">
                <h6>sync</h6>
                <div className="cars__content">
                    <button className="cars__button" onClick={decrease}>
                        -
                    </button>
                    <span className="cars__value">{value}</span>
                    <button className="cars__button" onClick={increase}>
                        +
                    </button>
                </div>

                <h6>async</h6>
                <div className="cars__content">
                    <button className="cars__button" onClick={asyncDecrease}>
                        -
                    </button>
                    <span className="cars__value">{value}</span>
                    <button className="cars__button" onClick={asyncIncrease}>
                        +
                    </button>
                </div>

                <h6>asyncAwait</h6>
                <div className="cars__content">
                    <button className="cars__button" onClick={asyncAwaitDecrease}>
                        -
                    </button>
                    <span className="cars__value">{value}</span>
                    <button className="cars__button" onClick={asyncAwaitIncrease}>
                        +
                    </button>
                </div>
            </div>
            <div className="cars__sum-container">
                <CarsSum />
            </div>
        </div>
    );
});
