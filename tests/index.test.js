const test = require('ava');
const os = require('os');

const localDomains = require('../index.js');

const interfaces = os.networkInterfaces();
const ip = Object.keys(interfaces)
	.reduce((a, item) => a.concat(interfaces[item]), [])
	.find(({ internal, family }) => !internal && family === 'IPv4');

test('Return a list given no tlds', t => {
	const result = localDomains('my-cool-site')
	const expected = [
		'my-cool-site.dev',
		'my-cool-site.meh',
		`${ip.address}.xip.io`,
		`my-cool-site.${ip.address}.xip.io`,
		`www.my-cool-site.${ip.address}.xip.io`
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
