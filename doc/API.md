# The API

```javascript
import {Version, params, os, browser, params, aliapp, thirdapp} from 'amfe-env';
```

## Version

A class which could compare a string of version.

### Constrcutor

#### new Version(ver)

create an instance of Version.

```jsdoc
@param {string} ver - a string of version like '1.0.0';
```

### Methods

#### toString()

return a string of this version.

```jsdoc
@return {string}
```

#### gt(v)

check if is great then a giving version.

```jsdoc
@param {string|Version} v - a string of version or an instance of Version.
@return {boolean}
```

#### gte(v)

check if is great then or equal with a giving version.

```jsdoc
@param {string|Version} v - a string of version or an instance of Version.
@return {boolean}
```

#### lt(v)

check if is less then a giving version.

```jsdoc
@param {string|Version} v - a string of version or an instance of Version.
@return {boolean}
```

#### lte(v)

check if is less then or equal with a giving version.

```jsdoc
@param {string|Version} v - a string of version or an instance of Version.
@return {boolean}
```

#### eq(v)

check if is equal with a giving version.

```jsdoc
@param {string|Version} v - a string of version or an instance of Version.
@return {boolean}
```

### Class Methods

#### Version.compare(v1, v2)

compare v1 with v2.

```jsdoc
@param {string|Version} v1 - a string of version or an instance of Version.
@param {string|Version} v2 - a string of version or an instance of Version.
@return {number} - 1 if v1 is great then v2, -1 if v1 is less then v2, 0 if v1 is equal with v2. 
```

## params

```jsdoc
@type {object} a querystring key/value map.
```

## os 

The information of the device operating system.

### os.name

```jsdoc
@type {string} the name of os, Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown etc.
```

### os.version

```jsdoc
@type {Version} the version of os, an instance of the Version class.
```

### os.isWindowsPhone

```jsdoc
@type {boolean} if a Windows Phone.
```

### os.isIPhone

```jsdoc
@type {boolean} if an iPhone.
```

### os.isIPad

```jsdoc
@type {boolean} if an iPad.
```

### os.isIOS

```jsdoc
@type {boolean} if an iOS.
```

### os.isAndroid

```jsdoc
@type {boolean} if an iAndroid.
```

### os.isAndroidPad

```jsdoc
@type {boolean} if a AndroidPad.
```

## browser

The information of the browser.

### browser.name

```jsdoc
@type {string} the name of the browser，UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown etc.
```

### browser.version

```jsdoc
@type {Version} the version of the brwoser，an instance of the Version class.
```

### browser.isUC

```jsdoc
@type {boolean} if a UC Browser.
```

### browser.isQQ

```jsdoc
@type {boolean} if a QQ Browser.
```

### browser.isIE

```jsdoc
@type {boolean} if a Desktop IE Browser.
```

### browser.isIEMobile

```jsdoc
@type {boolean} if a Mobile IE Browser.
```

### browser.isChrome

```jsdoc
@type {boolean} if a Mobile Chrome Browser.
```

### browser.isFirefox

```jsdoc
@type {boolean} if a Mobile Firefox Browser.
```

### browser.isAndroid

```jsdoc
@type {boolean} if a Android Browser.
```

### browser.isSafari

```jsdoc
@type {boolean} if a Mobile Safari Browser.
```

### browser.isWebview

```jsdoc
@type {boolean} if a webview inside an app.
```

## aliapp

The information of the app from Alibaba.

### aliapp.appname

```jsdoc
@param {string} the name of the app like 'TB' or 'TB-PD' etc.
```

### aliapp.version

```jsdoc
@param {Version} the version of the app.
```

### aliapp.platform

```jsdoc
@param {string} the platform of the app. 
@see os.name
```

### aliapp.windvane

```jsdoc
@param {Version} the version of the WindVane sdk.
```

### aliapp.poplayer

```jsdoc
@param {boolean} check if a poplayer frame.
```

### aliapp.poplayerVersion

```jsdoc
@param {Version} the version of the poplayer frame.
```

## thirdapp

The information of the non-ali app. 

### thirdapp.appname

```jsdoc
@param {string} the name of the app.
```

### thirdapp.isWeibo

```jsdoc
@param {string} check if a Weibo app.
```

### thirdapp.isWeixin

```jsdoc
@param {string} check if a Weixin app.
```


