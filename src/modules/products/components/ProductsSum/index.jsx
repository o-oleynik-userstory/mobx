import {observer} from 'mobx-react';
import {productsStore} from 'modules/products/store';
import React from 'react';
import './style.less';

/**
 * ProductsSum
 * @returns {*} Представление
 */
export const ProductsSum = observer(() => {
    const {value} = productsStore;
    return (
        <div className="products-sum">
            <h4>ProductsSum</h4>
            <div className="products-sum__content">
                <span className="products-sum__value">{value}</span>
            </div>
        </div>
    );
});
