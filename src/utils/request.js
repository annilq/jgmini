function request(url, data = {}, method = "POST") {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data.data || {},
            method: method,
            header: {
                'Content-Type': 'application/json',
                'Authorization': wx.getStorageSync('token')
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    resolve(res.data)
                } else if (res.statusCode === 401) {
                    wx.navigateTo({
                        url: '/pages/login/index',
                    })
                    reject(res.errMsg);
                }
            },
            fail: function (err) {
                reject(err)
            }
        })
    });
}

export default request