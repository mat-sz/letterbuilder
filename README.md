# letterbuilder

**letterbuilder** is a library created for building RFC 5322 compliant e-mail messages. The library is written in TypeScript, fully supports both browser and server environments.

| Parser                                                 | Inbound SMTP                                   |
| ------------------------------------------------------ | ---------------------------------------------- |
| [letterparser](https://github.com/mat-sz/letterparser) | [microMTA](https://github.com/mat-sz/microMTA) |

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
