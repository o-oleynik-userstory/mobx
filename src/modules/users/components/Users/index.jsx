import {observer} from 'mobx-react';
import {UsersSum} from 'modules/users/components/UsersSum';
import {usersStore} from 'modules/users/store';
import React from 'react';
import './style.less';

/**
 * Users
 * @returns {*} Представление
 */
export const Users = observer(() => {
    const {decrease, increase, value} = usersStore;
    return (
        <div className="users">
            <h4>Users</h4>
            <div className="users__content">
                <button className="users__button" onClick={decrease}>
                    -
                </button>
                <span className="users__value">{value}</span>
                <button className="users__button" onClick={increase}>
                    +
                </button>
            </div>
            <div className="products__sum-container">
                <UsersSum />
            </div>
        </div>
    );
});
