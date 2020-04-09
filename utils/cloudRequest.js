function cloudFun (name) {
	return wx.cloud.callFunction({
		name: name
	}).then(res => {
		
	}).catch(err => {

	})
}