import httpaddress from "./http"
function upload(imageUri, imageName,type,key) {
        let data = new FormData()
        console.log("imageUri", imageUri)
        if (!imageUri) {return}
        data.append(key, { uri: imageUri, name: imageName, type: type })//加入图片
    // console.log("uploaddata",data)
        const config = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Content-Language': React.NativeModules.RNI18n.locale,
                // 'Authorization': token,
            },
            body: data,
        }
    var baseUrl = httpaddress
   
    var url = `${baseUrl}limswebapi/api/FileServer/UploadServer`
        return fetch(url, config)
            .then(function (response) {
                return response.json();
            }).then((responseData) => {
                var downurl = `${baseUrl}limswebapi/api/FileServer/DownloadServer`
                var imageUrl = `${downurl}?FileGUID=${responseData.FileGUID}&FileName=${imageName}`
                // console.log("imageUrl", imageUrl)
                return imageUrl
            })
}

export default upload;