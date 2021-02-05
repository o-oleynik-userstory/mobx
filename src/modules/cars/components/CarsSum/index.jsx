import {observer} from 'mobx-react';
import {carsStore} from 'modules/cars/store';
import React, {useCallback} from 'react';
import './style.less';

/**
 * CarsSum
 * @returns {*} Представление
 */
export const CarsSum = observer(() => {
    const {doubleValue, value} = carsStore;

    const handleClick = useCallback(() => {
        console.log('doubleValue');
        console.log(doubleValue);
    }, [doubleValue]);

    return (
        <div className="cars-sum">
            <h4>CarsSum</h4>
            <div className="cars-sum__content">
                <span className="cars-sum__value">{value}</span>
            </div>
            <div className="cars-sum__content">
                <span className="cars-sum__value">Double value: {doubleValue}</span>
            </div>
            <div className="cars-sum__content cars-sum__content_with-margin">
                <button className="cars__button" onClick={handleClick}>
                    Log doubleValue
                </button>
            </div>
        </div>
    );
});
