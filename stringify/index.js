if (!window.JSON) {
	window.JSON = {
		parse: function(sJSON) { return eval('(' + sJSON + ')'); },
		stringify: (function () {
			const toString = Object.prototype.toString
			const isArray = Array.isArray || function (a) {
				return toString.call(a) === '[object Array]'
			}
			const escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'}
			const escFunc = function (m) {
				return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1)
			}
			const escRE = /[\\"\u0000-\u001F\u2028\u2029]/g
			
			return function stringify(value) {
				if (value == null) {
					return 'null';
				} else if (typeof value === 'number') {
					return isFinite(value) ? value.toString() : 'null'; // isFinite 非无穷大
				} else if (typeof value === 'boolean') {
					return value.toString();
				} else if (typeof value === 'object') {
					if (typeof value.toJSON === 'function') {
						return stringify(value.toJSON());
					} else if (isArray(value)) {
						let res = '['
						for (let i = 0; i < value.length; i++)
							res += (i ? ', ' : '') + stringify(value[i]);
						return res + ']';
					} else if (toString.call(value) === '[object Object]') {
						const tmp = []
						for (const k in value) {
							if (value.hasOwnProperty(k)) // hasOwnProperty 重点 只转换可遍历属性
								tmp.push(stringify(k) + ': ' + stringify(value[k]));
						}
						return '{' + tmp.join(', ') + '}';
					}
				}
				return '"' + value.toString().replace(escRE, escFunc) + '"';
			};
		})()
	};
}
