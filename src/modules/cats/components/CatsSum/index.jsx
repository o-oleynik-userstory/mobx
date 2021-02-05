import {observer} from 'mobx-react';
import {catsStore} from 'modules/cats/store';
import React from 'react';
import './style.less';

/**
 * CatsSum
 * @returns {*} Представление
 */
export const CatsSum = observer(() => {
    const {value} = catsStore;

    return (
        <div className="cars-sum">
            <h4>CarsSum</h4>
            <div className="cars-sum__content">
                <span className="cars-sum__value">{value}</span>
            </div>
        </div>
    );
});
