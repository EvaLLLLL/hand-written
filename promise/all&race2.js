Promise.prototype.myAll = (iterator) => {
	let currentCount = 0
	let len = iterator.length
	let result = []
	
	return new Promise((resolve, reject) => {
		for (let key in iterator) {
			Promise.resolve(iterator[key]).then(res => {
					result[key] = res
					
					if (currentCount === len) {
						resolve(result)
					}
					
					currentCount++
				})
				.catch(err => reject(err))
		}
	})
}

Promise.prototype.myRace = (iterator) => {
	return new Promise((resolve, reject) => {
		for (let key in iterator) {
			Promise.resolve(iterator[key])
				.then(res => resolve(res))
				.catch(err => reject(err))
		}
	})
}
