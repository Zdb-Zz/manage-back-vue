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
export const getRouteFire = query => {
    return request({
        url: '/route/getRouteFire',
        method: 'get',
        params: query
    });
};

export const getTopicType = () => {
    return request({
        url: '/topic/getTopicType',
        method: 'get'
    });
};

export const getTopicList = query => {
    return request({
        url: '/topic/getTopicList',
        method: 'get',
        params: query
    });
};

export const delTopics = id => {
    return request({
        url: '/topic/delTopic',
        method: 'get',
        params: {id}
    });
};
export const getCityList = query => {
    return request({
        url: '/city/getCityList',
        method: 'get',
        params: query
    });
};

export const updateCity = form => {
    return request({
        url: '/city/updateCity',
        method: 'post',
        data: form
    });
};

export const addCity = form => {
    return request({
        url: '/city/addCity',
        method: 'post',
        data: form
    });
};