import api from './api'
class commonApi{
    constructor() {
       
    }
    // 查询下级权限目录
    getNextRightSet (userid = 0, parSetId = 0) {
        let url = 'limswebapi/api/HomePage/MobileAppNextRightSet'
        let params = {
                fldUserID: userid,
                fldParentID: parSetId
            }
        return api.post(url, params)
    }
}

export default commonApi