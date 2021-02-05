import {observer} from 'mobx-react';
import {ProductsSum} from 'modules/products/components/ProductsSum';
import {productsStore} from 'modules/products/store';
import React from 'react';
import './style.less';

/**
 * Products
 * @returns {*} Представление
 */
export const Products = observer(() => {
    const {asyncDecrease, asyncIncrease, asyncAwaitDecrease, asyncAwaitIncrease, decrease, increase, status, value} = productsStore;
    console.log('render Products');
    return (
        <div className="products">
            <h4>Products</h4>
            <div className="products__content">
                <p>
                    <b>Status</b> {status}
                </p>
            </div>
            <div className="products__content-area">
                <h6>sync</h6>
                <div className="products__content">
                    <button className="products__button" onClick={decrease}>
                        -
                    </button>
                    <span className="products__value">{value}</span>
                    <button className="products__button" onClick={increase}>
                        +
                    </button>
                </div>

                <h6>async</h6>
                <div className="products__content">
                    <button className="products__button" onClick={asyncDecrease}>
                        -
                    </button>
                    <span className="products__value">{value}</span>
                    <button className="products__button" onClick={asyncIncrease}>
                        +
                    </button>
                </div>

                <h6>asyncAwait</h6>
                <div className="products__content">
                    <button className="products__button" onClick={asyncAwaitDecrease}>
                        -
                    </button>
                    <span className="products__value">{value}</span>
                    <button className="products__button" onClick={asyncAwaitIncrease}>
                        +
                    </button>
                </div>
            </div>
            <div className="products__sum-container">
                <ProductsSum />
            </div>
        </div>
    );
});
