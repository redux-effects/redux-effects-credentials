
# redux-effects-credentials

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Add credentials to fetch requests when conditions are met

## Installation

    $ npm install redux-effects-credentials

## Usage

Add the credential middleware of your choice to the effects stack before the fetch middleware.

### Query string

```javascript
import effects from 'redux-effects'
import {query} from 'redux-effects-credentials'
import fetch from 'redux-effects-fetch'

applyMiddleware(query(/https?\:\/\/myapiserver\.com.*/, 'access_token', state => state.accessToken), fetch)(createStore)
```

### Bearer

```javascript
import effects from 'redux-effects'
import {bearer} from 'redux-effects-credentials'
import fetch from 'redux-effects-fetch'

applyMiddleware(effects, bearer(/https?\:\/\/myapiserver.com\.com.*/, state => state.accessToken), fetch))(createStore)
```

### Pattern

Pattern may be a regular expression or a function that returns true/false.

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
