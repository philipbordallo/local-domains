const os = require('os');

const DEFAULT_TYPES = ['dev', 'meh', 'xip', 'name.xip', 'www.name.xip'];

function localDomains(name, types = DEFAULT_TYPES) {
	const ip = os.networkInterfaces().en0.filter(networkInterface => networkInterface.family === 'IPv4')[0];

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
