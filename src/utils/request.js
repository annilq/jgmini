function request(url, data = {}, method = "POST") {
    const requertPromise = new Promise(function (resolve, reject) {
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
                    // console.log(res.data);
                    if (res.data.code === 0) {
                        resolve(res.data)
                    } else {
                        reject(res.data.info || '操作异常');
                    }
                } else if (res.statusCode === 401) {
                    wx.navigateTo({
                        url: '/pages/login/index',
                    })
                    console.log("token", res.errMsg);
                    reject("请重新登录");
                }
                reject(res.data.info || '操作异常');
            },
            fail: function (err) {
                reject(err)
            }
        })
    });
    return requertPromise.then(data => {
        console.log(data);
        return data;
    }).catch(error => {
        wx.showToast({
            title: error,
        });
    })
}
export function requestMoile(url, data = {}, method = "POST") {
    const requertPromise = new Promise(function (resolve, reject) {
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
                    if (res.data.code === 1) {
                        resolve(res.data)
                    } else {
                        reject(res.data.info || '操作异常');
                    }
                } else if (res.statusCode === 401) {
                    wx.navigateTo({
                        url: '/pages/login/index',
                    })
                    console.log("token", res.errMsg);
                    reject("请重新登录");
                }
                reject(res.data.info || '操作异常');
            },
            fail: function (err) {
                reject(err)
            }
        })
    });
    return requertPromise.then(data => {
        console.log(data);
        return data;
    }).catch(error => {
        wx.showToast({
            title: error,
        });
    })
}

export default request