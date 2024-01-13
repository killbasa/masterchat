# Masterchat

[![npm](https://badgen.net/npm/v/masterchat)](https://npmjs.org/package/masterchat)
[![npm: total downloads](https://badgen.net/npm/dt/masterchat)](https://npmjs.org/package/masterchat)
[![npm: publish size](https://badgen.net/packagephobia/publish/masterchat)](https://npmjs.org/package/masterchat)
[![typedoc](https://badgen.net/badge/docs/typedoc/purple)](https://holodata.github.io/masterchat/)

Masterchat is the most powerful library for YouTube Live Chat, supporting parsing 20+ actions, video comments and transcripts, as well as sending messages and moderating chats.

## Install

```
npm install masterchat
```

```js
import { Masterchat, stringify } from 'masterchat';

const mc = await Masterchat.init('oyxvhJW1Cf8');

const chats = mc.iter().filter((action) => action.type === 'addChatItemAction');

for await (const chat of chats) {
	console.log(`${chat.authorName}: ${stringify(chat.message)}`);
}
```

See [MANUAL](https://github.com/holodata/masterchat/tree/master/MANUAL.md) for further instructions.

## CLI

```bash
npm i -g masterchat-cli
```

```bash
mc watch --org Hololive
```

See [masterchat-cli](https://github.com/holodata/masterchat-cli) for detailed usage.

## Desktop App

See [☄️Komet](https://github.com/holodata/komet) for further information.

## Community

### Contributing

- Use masterchat with `DEBUG=masterchat` and [report](https://github.com/holodata/masterchat/issues/new) logs that are prefixed with `[action required]`
- Squash [TODOs](https://github.com/holodata/masterchat/search?l=TypeScript&q=TODO)

See [Contribution Guide](./CONTRIBUTING.md) for more information.
Ask questions in `#masterchat` channel on [holodata Discord server](https://holodata.org/discord).

## Attributions

This is a fork of https://github.com/sigvt/masterchat
