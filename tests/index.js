const test = require('ava');
const os = require('os');

const localDomains = require('../index.js');


const ip = os.networkInterfaces().en0.filter(networkInterface => networkInterface.family === 'IPv4')[0];

test('Return a list given no tlds', t => {
	const result = localDomains('my-cool-site')
	const expected = [
		'my-cool-site.dev',
		'my-cool-site.meh',
		`${ip.address}.xip.io`,
		`my-cool-site.${ip.address}.xip.io`
	];

	t.deepEqual(result, expected)
});

test('Return a list given tlds', t => {
	const result = localDomains('my-cool-site', ['localdomain', 'thebest', 'xip'])
	const expected = [
		'my-cool-site.localdomain',
		'my-cool-site.thebest',
		`${ip.address}.xip.io`
	];

	t.deepEqual(result, expected)
});
