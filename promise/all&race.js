import { MyPromise } from './practice';

const myAll = (iterator) => {
	let currentCount = 0
	let len = iterator.length
	let result = []
	
	return new Promise((resolve, reject) => {
		for(let key in iterator) {
			Promise.resolve(iterator[key])
				.then(data => {
					result[key] = data
					
					if (currentCount === len) {
						resolve(result)
					}
					
					currentCount += 1
				})
				.catch(e => reject(e))
		}
	})
}

const myRace = (iterator) => {
	return new Promise((resolve, reject) => {
		for(let i in iterator) {
			Promise.resolve(iterator[i])
				.then(data => resolve(data))
				.catch(e => reject(e))
		}
	})
}

MyPromise.prototype.all = myAll
MyPromise.prototype.race = myRace
