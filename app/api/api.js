/**
 * api
 * @author 王伟
 *time:2018-10-2
 */

import request from "./request";
// import http from './http'
let http = "http://rzenjor.com:9999"

function post(url, data, key, time){
    return request(`${http}${url}`, data, "POST", key ? key : "", time ? time : "")
}
function get(url,data,key,time) {
    return request(`${http}${url}`, data, "GET", key?key:"", time?time:"")
}
function login(data){
    let url = "/index/user/login_auto?imei=73686318-620D-4CF7-BB3E-1A5089C64099& uid=148806"
    return request(`${http}${url}`, data, "GET")
}
function getHomePageClassify(token){
    let url = "/index/video/zhuantilist"
    let data = {
        token: token
    }
    return request(`${http}${url}`, data , "GET")
}

function getVideoInfo(token, videoid){
    let url = "/index/video/videoinfo"
    let data = {
        token: token,
        videoid: videoid
    }
    return request(`${http}${url}`, data, "GET")
}
function getVideoIndex(params) {
    let token = global.loginData.session
    let data = {
        token,
        ...params
    }
    let url = "/index/video/videoindex"
    return request(`${http}${url}`, data, "GET")
}
function getVideoList(params){
    let token = global.loginData.session
    let data={
        token,
        ...params
    }
    let url = "/index/video/videolist"
    return request(`${http}${url}`, data, "GET")
}

function searchVideo(params){
    let token = global.loginData.session
    let data = {
        token,
        ...params
    }
    let url = "/index/video/search"
    return request(`${http}${url}`, data, "GET")
    
}


function getactor(){
    let token = global.loginData.session
    let data = {
        token
    }
    let url = "/index/video/getactor"
    return request(`${http}${url}`, data, "GET")
}
function getactorlist(){
    let token = global.loginData.session
    let data = {
        token,
        ...params
    }
    let url = "/index/video/getactorlist"
    return request(`${http}${url}`, data, "GET")
}

export default{
    get,
    post,
    login,
    getHomePageClassify,
    getVideoInfo,
    getVideoIndex,
    getVideoList,
    searchVideo,
    getactor,
    getactorlist
}