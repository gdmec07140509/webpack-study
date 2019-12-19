const { SyncHook, AsyncSeriesHook } = require('tapable')

class Car {
	constructor() {
		this.hooks = {
			// 加速
			accelerate: new SyncHook(['newspeed']),
			// 刹车
			brake: new SyncHook(),
			// 计算路径
			claculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList']),
		}
	}
}

const myCar = new Car()

// 绑定同步钩子
myCar.hooks.brake.tap('WarnningLampPlugin', () => console.log('WarnningLampPlugin'))

// 绑定同步钩子 并传参
myCar.hooks.accelerate.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${newSpeed}`))

// 绑定一个异步Promise钩子
myCar.hooks.claculateRoutes.tapPromise('calculateRoutes tapPromise', (source, target, routesList, callback) => {
	console.log('source', source)
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`tapPromise to ${source}${target}${routesList}`)
			resolve()
		}, 1000)
	})
})

myCar.hooks.brake.call()
myCar.hooks.accelerate.call(10)

console.time('cost')
myCar.hooks.claculateRoutes.promise('Async', 'hook', 'demo').then(
	() => {
		console.timeEnd('cost')
	},
	err => {
		console.error(err)
		console.timeEnd('cost')
	}
)
