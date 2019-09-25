/**
 * fetch请求
 * @author 王伟
 *time:2018-10-2
 */
import axios from "axios"
import cache from "./cache";
import config from './config'

function objToString(obj) {
    let arr = []
    for (let item in obj) {
        let str = `${item}=${obj[item]}`
        arr.push(str)
    }
    return arr.join("&")
}

let request = function (url,data={},method="GET",key,time){
    return new Promise((resolve,reject)=>{
        let requestObj = {};
        let dataStr;
        if (method === "GET") {
            dataStr = objToString(data)
            url = url + "?" + dataStr
            requestObj = {
                method: method,
                headers: config.requestHeader
            }
        } else {
            if (config.requestHeader["Content-Type"] === "application/json") {
                dataStr = JSON.stringify(data)
                console.log("dataStr", dataStr)
            } else {
                dataStr = objToString(data)
            }
            requestObj = {
                method: method,
                headers: config.requestHeader,
                body: dataStr
            }
        }
        if(key&&time){
            cache.get(key).then((storage) => {
                if (storage) {
                    resolve(storage)
                } else {
                    fetch(url, requestObj).then((res) => {
                      return res.json()
                    },(rej)=>{
                        console.log("reject",rej)
                        reject(rej)
                    }).then((value)=>{
                        cache.set(key, value, time)
                        resolve(value)
                    },(rej)=>{
                        console.log("reject",rej)
                        reject(rej)
                    })
                }
            })
        }else{
            fetch(url, requestObj).then((res) => {
                return res.json()
            },(rej)=>{
                console.log("reject",rej)
                reject(rej)
            }).then((value)=>{
                resolve(value)
            },(rej)=>{
                console.log("reject",rej)
                reject(rej)
            })
        }
    })
}

let request2 = function (url, data = {}, method = "GET", key, time){
    let requestObj = {}
    if(method==="POST"){
        requestObj = {
            headers: { 'content-type': 'application/json' },
            method: method,
            url: url,
            data: data
        }
    }
    if (method === "GET"){
        url = `${url}?${objToString(data)}`
        requestObj = {
            headers: { 'content-type': 'application/json' },
            method: method,
            url: url,
        } 
    }
    return axios(requestObj).then(response=>{
        return response.data
    })
}
export default request2