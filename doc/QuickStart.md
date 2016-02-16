# Getting Started

## Install

```shell
npm install amfe-env --save
```

## Usage

```javascript
import * as env from 'amfe-env';

console.log(env.os.name);

//> iPhone
```

## Sample

Detect app from Alibaba：

```javascript
import {aliapp} from 'amfe-env';

if (aliapp && aliapp.appname === 'TB') {
    // in Mobile Taobao
}
```

Compare versions：

```javascript
import {os} from 'amfe-env';

if (os.isIPhone && os.version.gte('9')) {
    // iOS 9
}
```

Resolve querystring from url：

```javascript
import {params} from 'amfe-env';

if (params) {
    for (let key in params) {
        console.log(params[key]);
    }
}
```

