<h1 align="center">
  letterbuilder
</h1>

<p align="center">
<img alt="workflow" src="https://img.shields.io/github/actions/workflow/status/mat-sz/letterbuilder/node.js.yml?branch=master">
<a href="https://npmjs.com/package/letterbuilder">
<img alt="npm" src="https://img.shields.io/npm/v/letterbuilder">
<img alt="npm" src="https://img.shields.io/npm/dw/letterbuilder">
<img alt="NPM" src="https://img.shields.io/npm/l/letterbuilder">
</a>
</p>

**letterbuilder** is a library created for building RFC 5322 compliant e-mail messages. The library is written in TypeScript, fully supports both browser and server environments.

| Parser                                                 | SMTP client/server                                 |
| ------------------------------------------------------ | -------------------------------------------------- |
| [letterparser](https://github.com/mat-sz/letterparser) | [@typemail/smtp](https://github.com/typemail/smtp) |

## Usage

### General information

To build the message, use `build`:

```js
import { build } from 'letterbuilder';
let res = build({
  from: 'test@example.com',
  to: ['someone@example.com'],
  text: 'Hello, world!',
});
```
