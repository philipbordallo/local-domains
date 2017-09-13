const os = require('os');

const DEFAULT_TYPES = ['dev', 'meh', 'xip', 'name.xip', 'www.name.xip'];

function localDomains(name, types = DEFAULT_TYPES) {
	const interfaces = os.networkInterfaces();
	const ip = Object.keys(interfaces)
		.reduce((a, item) => a.concat(interfaces[item]), [])
		.find(({ internal, family }) => !internal && family === 'IPv4');

	return types.map(type => {
		if (type === 'xip' || type === 'xip.io') {
			return `${ip.address}.xip.io`;
		}
		else if (type === 'name.xip' || type === 'name.xip.io') {
			return `${name}.${ip.address}.xip.io`;
		}
		else if (type === 'www.name.xip' || type === 'www.name.xip.io') {
			return `www.${name}.${ip.address}.xip.io`;
		}

		return `${name}.${type}`;
	});
}

module.exports = localDomains;
