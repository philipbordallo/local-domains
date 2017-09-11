const os = require('os');

const DEFAULT_TYPES = ['dev', 'meh', 'xip.io', 'name.xip.io'];

function localDomains(name, types = DEFAULT_TYPES) {
	const ip = os.networkInterfaces().en0.filter(networkInterface => networkInterface.family === 'IPv4')[0];

	return types.map(type => {
		if (type === 'xip' || type === 'xip.io') {
			return `${ip.address}.xip.io`;
		}
		else if (type === 'name.xip' || type === 'name.xip.io') {
			return `${name}.${ip.address}.xip.io`;
		}

		return `${name}.${type}`;
	});
}

module.exports = localDomains;
