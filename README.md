local-domains
=============
> Returns a list of local domains


## Install
```
npm install --save-dev local-domains
```

## Examples

```js
const localDomains = require('localDomains');

localDomains('my-cool-site');
// => ['my-cool-site.dev', 'my-cool-site.meh', '10.9.8.7.xip.io', 'my-cool-site.10.9.8.7.xip.io']
```

You can also pass an `array` of wanted top level domains:

```js
const localDomains = require('localDomains');

localDomains('my-cool-site', ['localdomain', 'thebest', 'xip']);
// => ['my-cool-site.localdomain', 'my-cool-site.thebest', '10.9.8.7.xip.io']
```

This works great if you want to set the `allowedHosts` in webpack:
```js
const localDomains = require('localDomains');
const hostList = localDomains('my-cool-site');
…
devServer: {
  allowedHosts: hostList,
  compress: true,
  host: '0.0.0.0',
  hot: true,
  inline: true,
  port: 3000
}
…
```

or log out the places where you can access your dev server:
```js
const localDomains = require('localDomains');
const hostList = localDomains('my-cool-site');

hostList.forEach(host => {
  console.log(host);
});
```

## API

### `localDomains(name, types)`
Returns an `array` of domains.

#### Parameter `name`
A `string`.

#### Parameter `types`
An `array` of top level domains, with the default of `['dev', 'meh', 'xip.io', 'name.xip.io']`. You can pass `['xip']` or `['xip.io']` and you will get `[IP.xip.io]`.
