local-domains
=============
> Returns a list of local domains

[![npm](https://img.shields.io/npm/v/local-domains.svg)](https://www.npmjs.com/package/local-domains) [![Travis](https://img.shields.io/travis/philipbordallo/local-domains.svg)](https://travis-ci.org/philipbordallo/local-domains/) [![David](https://img.shields.io/david/philipbordallo/local-domains.svg)](https://david-dm.org/philipbordallo/local-domains) [![David](https://img.shields.io/david/dev/philipbordallo/local-domains.svg)](https://david-dm.org/philipbordallo/local-domains?type=dev)

## Install
With [npm](https://www.npmjs.com/package/local-domains):
```
npm install --save-dev local-domains
```

## Examples

```js
const localDomains = require('localDomains');

localDomains('my-cool-site');
// => [
//  'my-cool-site.dev', 
//  'my-cool-site.meh', 
//  '10.9.8.7.xip.io', 
//  'my-cool-site.10.9.8.7.xip.io', 
//  'www.my-cool-site.10.9.8.7.xip.io'
// ]
```

You can also pass an `array` of wanted top level domains:

```js
const localDomains = require('localDomains');

localDomains('my-cool-site', ['localdomain', 'thebest', 'xip']);
// => [
//  'my-cool-site.localdomain', 
//  'my-cool-site.thebest', 
//  '10.9.8.7.xip.io'
// ]
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
A **required** `string`.

#### Parameter `types`
An **optional** `array` of top level domains, with the default of `['dev', 'meh', 'xip', 'name.xip', www.name.xip]`. You can pass `['xip']` or `['xip.io']` and you will get `[IP.xip.io]`.
