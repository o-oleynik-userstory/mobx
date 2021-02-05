import {observer} from 'mobx-react';
import {usersStore} from 'modules/users/store';
import React from 'react';
import './style.less';

/**
 * UsersSum
 * @returns {*} Представление
 */
export const UsersSum = observer(() => {
    const {value} = usersStore;
    return (
        <div className="users-sum">
            <h4>UsersSum</h4>
            <div className="users-sum__content">
                <span className="users-sum__value">{value}</span>
            </div>
        </div>
    );
});
