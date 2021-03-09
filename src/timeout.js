/**
 * setTimeout 封裝
 * @template T
 * @returns {{stop: function(): void, start: function(fun: function(): void, delay: number = 0): void, startSync: function(Promise<T>, delay: number = 0): Promise<T>}}
 */
function timeout() {
	let timer = null
	function start(fun, delay = 0) {
		if (timer == null) {
			timer = setTimeout(() => {
				fun()
			}, delay)
		}
	}
	function startSync(promiseFun, delay = 0) {
		return new Promise(resolve => {
			if (timer == null) {
				timer = setTimeout(() => {
					resolve(promiseFun())
				}, delay)
			}
		})
	}
	function stop() {
		if (timer != null) {
			clearTimeout(timer)
			timer = null
		}
	}

	return {
		start,
		startSync,
		stop,
	}
}

export default timeout
