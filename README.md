# express-4-boilerplate

This is a small boilerplate for:

* Express 4 (MVC)
* Google+ oAuth 2.0 (profile and emails) using [PassportJS](http://passportjs.org/)
* Redis (for sessions)
* Postgres (feel free to `npm install` other dialects)

## Installation

1. `git clone https://github.com/durango/express-4-boilerplate.git`

2. `npm install`

3. Edit and rename config-example.json to config.json

4. Create the tables (or add `{force: true}` and run the application once and then remove it)

5. Create a oAuth client ID for Google through their [console](https://console.developers.google.com). The recommended callback URL is `schema://your-domain.tld/api/auth/google/callback`

6. `node index.js`

## How this all works

### Controllers

Controllers can do whatever they want for the most part with the exception of what it `exports`. The export has two formats:

**Array:**

```js
module.exports = ['/mountpath', Router];
```

**Object:**

```js
module.exports = {path: '/mountpath', controller: Router};
```

You just need to tell the boilerplate which path you want to mount and return an express.Router() instance.

In order to retrieve all of your models, simply type in:

```js
var models = require('../models');
```

And all of the models will be exposed to you (along with the `Sequelize` library and `sequelize` instance).

### Models

Models are simply exported Sequelize objects. For more information, refer to [Sequelize's import documentation](http://sequelizejs.com/docs/latest/models#import).

### index.js

Creates a new Express application and mounts `server.js`' Express application.

### server.js

This is where all of your server's configuration is stored along with any middleware that you want to add (e.g. `passport`).

### routing

Routing gets mounted on top of `/api` as the URL. The reason behind this is that NodeJS should handle server-side logic while something else should handle the client-side templating and scripts (it's up to you really depending on your project). I would recommend making some sort of build system for creating your templates.

# License

Copyright (c) 2014, Daniel Durante <me@danieldurante.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
