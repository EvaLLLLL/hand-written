// const p = new MyPromise((resolve, reject) => {
// 	resolve()
// 	reject('reason')
// })

// const successCallback = () => {}
// const failCallback = () => {}
// p.then(successCallback, failCallback)

export enum Status {
	Pending= 'pending',
	Fullfilled = 'fullfilled',
	Rejected = 'rejected'
}

type Resolve = (result?: any) => void
type Reject = (reason?: any) => void

const isPending = (status: Status) => status === Status.Pending

export class MyPromise {
	status = Status.Pending
	resolveCallbacks: Function[] = []
	rejectCallbacks: Function[] = []
	
	resolve: Resolve = (result) => {
		if (!isPending(this.status)) return
		this.status = Status.Fullfilled
		
		setTimeout(() => {
			this.resolveCallbacks.forEach(fn => fn(result))
		})
	}
	
	reject: Reject = (reason) => {
		if (!isPending(this.status)) return
		this.status = Status.Rejected
		
		setTimeout(() => {
			this.rejectCallbacks.forEach(fn => fn(reason))
		})
	}
	
	constructor(fn: (resolve: Resolve, reject: Reject) => void) {
		fn(this.resolve.bind(this), this.reject.bind(this))
	}
	
	then(success?: any, fail?: any){
		if (success instanceof Function) {
			this.resolveCallbacks.push(success)
		}
		
		if (fail instanceof Function) {
			this.rejectCallbacks.push(fail)
		}
	}
}
