import {observer} from 'mobx-react';
import {carsStore} from 'modules/cars/store';
import React from 'react';
import './style.less';

/**
 * CarsSum
 * @returns {*} Представление
 */
export const CarsSum = observer(() => {
    const {value} = carsStore;
    return (
        <div className="cars-sum">
            <h4>CarsSum</h4>
            <div className="cars-sum__content">
                <span className="cars-sum__value">{value}</span>
            </div>
        </div>
    );
});
