import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/user/getUserList',
        method: 'get',
        params: query
    });
};

export const updateData = form => {
    return request({
        url: '/user/updateUser',
        method: 'post',
        data: form
    });
};
export const deleteUser = userId => {
    return request({
        url: '/user/deleteUser',
        method: 'get',
        params: {userId}
    });
};

export const getTravels = query => {
    return request({
        url: '/travel/getTravelList',
        method: 'get',
        params: query
    });
};

export const deleteTravels = answerId => {
    return request({
        url: '/travel/delTravel',
        method: 'get',
        params: {answerId}
    });
};
export const getRouteList = query => {
    return request({
        url: '/route/getRouteList',
        method: 'get',
        params: query
    });
};
export const delRoutes = id => {
    return request({
        url: '/route/deleteRoute',
        method: 'get',
        params: {id}
    });
};
