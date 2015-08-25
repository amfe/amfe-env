var UA_TAOBAO_ANDROID = 'Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; MI 3W Build/KTU84P)' +
	' AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/1.0.0.100 U3/0.8.0 Mobile' +
	' Safari/534.30 AliApp(TB/5.3.2) WindVane/6.4.0 1080X1920 GCanvas/1.4.2.17',
	UA_TAOBAO_IPHONE_5 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_6 like Mac OS X)' +
	' AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11B651' +
	' AliApp(TB/5.3.2) WindVane/6.4.0 640X1136';

casper.test.begin('begin with TB@android useragent.', 26, function suite(test) {

	var ua, env;

	casper.userAgent(UA_TAOBAO_ANDROID);

	casper.start('./test/test.html?a=1&b=yy', function() {

		ua = this.getGlobal('navigator').userAgent;
		test.assertEquals(this.getGlobal('navigator').userAgent, UA_TAOBAO_ANDROID, 'set ua successfully.');

	});

	casper.then(function() {
			env = this.getGlobal('lib').env;

			///// lib.env.aliapp
			test.assertEquals(env.aliapp.windvane.val, '6.4.0', 'lib.env.aliapp.windvane: 6.4.0');
			test.assertEquals(env.aliapp.appname, 'TB', 'lib.env.aliapp.appname: TB');
			test.assertEquals(env.aliapp.version.val, '5.3.2', 'lib.env.aliapp.version: 5.3.2');
			test.assertEquals(env.aliapp.platform, 'Android', 'lib.env.aliapp.platform: Android');

			///// lib.env.browser
			test.assertEquals(env.browser.name, 'UC', 'lib.env.browser.name: UC');
			test.assertEquals(env.browser.version.val, '1.0.0.100', 'lib.env.browser.version: 1.0.0.100');
			test.assertTruthy(env.browser.isUC, 'isUC: true');
			test.assertFalsy(env.browser.isQQ, 'isQQ: false');
			test.assertFalsy(env.browser.isIE, 'isIE: false');
			test.assertFalsy(env.browser.isIEMobile, 'isIEMobile: false');
			test.assertFalsy(env.browser.isIELikeWebkit, 'isIELikeWebkit: false');
			test.assertFalsy(env.browser.isChrome, 'isChrome: false');
			test.assertFalsy(env.browser.isAndroid, 'isAndroid(original browser): false');
			test.assertFalsy(env.browser.isSafari, 'isSafari: false');
			test.assertFalsy(env.browser.isWebview, 'is(chrome)Webview: false');

			///// lib.env.os
			test.assertEquals(env.os.name, 'Android', 'lib.env.os.name: Android');
			test.assertEquals(env.os.version.val, '4.4.4', 'lib.env.os.version: 4.4.4');
			test.assertFalsy(env.os.isWindowsPhone, 'isWindowsPhone: false');
			test.assertFalsy(env.os.isIPhone, 'isIPhone: false');
			test.assertFalsy(env.os.isIPad, 'isIPad: false');
			test.assertFalsy(env.os.isIOS, 'isIOS: false');
			test.assertTruthy(env.os.isAndroid, 'isAndroid: true');
			test.assertFalsy(env.os.isAndroidPad, 'isAndroidPad: false');

			///// lib.env.params
			test.assertEquals(env.params, {a:'1', b:'yy'}, 'env.params: {a:\'1\', b:\'yy\'}');

			///// lib.env.thirdapp
			test.assertFalsy(env.thirdapp, 'env.thirdapp: false');
			
	});

	casper.run(function() {
		test.done();
	});

});

casper.test.begin('begin with TB@iphone5 useragent.', 26, function suite(test) {

	var ua, env;

	casper.userAgent(UA_TAOBAO_IPHONE_5);

	casper.start('./test/test.html?a=1&b=yy', function() {

		ua = this.getGlobal('navigator').userAgent;
		test.assertEquals(this.getGlobal('navigator').userAgent, UA_TAOBAO_IPHONE_5, 'set ua successfully.');

	});

	casper.then(function() {
			env = this.getGlobal('lib').env;

			///// lib.env.aliapp
			test.assertEquals(env.aliapp.windvane.val, '6.4.0', 'lib.env.aliapp.windvane: 6.4.0');
			test.assertEquals(env.aliapp.appname, 'TB', 'lib.env.aliapp.appname: TB');
			test.assertEquals(env.aliapp.version.val, '5.3.2', 'lib.env.aliapp.version: 5.3.2');
			test.assertEquals(env.aliapp.platform, 'iPhone', 'lib.env.aliapp.platform: iPhone');

			///// lib.env.browser
			test.assertEquals(env.browser.name, 'iOS Webview', 'lib.browser.name: iOS Webview');
			test.assertEquals(env.browser.version.val, '7.0.6', 'lib.browser.version: 7.0.6');
			test.assertFalsy(env.browser.isUC, 'isUC: false');
			test.assertFalsy(env.browser.isQQ, 'isQQ: false');
			test.assertFalsy(env.browser.isIE, 'isIE: false');
			test.assertFalsy(env.browser.isIEMobile, 'isIEMobile: false');
			test.assertFalsy(env.browser.isIELikeWebkit, 'isIELikeWebkit: false');
			test.assertFalsy(env.browser.isChrome, 'isChrome: false');
			test.assertFalsy(env.browser.isAndroid, 'isAndroid(original browser): false');
			test.assertFalsy(env.browser.isSafari, 'isSafari: false');
			test.assertTruthy(env.browser.isWebview, 'is(ios webview or android chrome webview)Webview: true');

			///// lib.env.os
			test.assertEquals(env.os.name, 'iPhone', 'lib.env.os.name: iPhone');
			test.assertEquals(env.os.version.val, '7.0.6', 'lib.env.os.version: 7.0.6');
			test.assertFalsy(env.os.isWindowsPhone, 'isWindowsPhone: false');
			test.assertTruthy(env.os.isIPhone, 'isIPhone: true');
			test.assertFalsy(env.os.isIPad, 'isIPad: false');
			test.assertTruthy(env.os.isIOS, 'isIOS: true');
			test.assertFalsy(env.os.isAndroid, 'isAndroid: false');
			test.assertFalsy(env.os.isAndroidPad, 'isAndroidPad: false');

			///// lib.env.params
			test.assertEquals(env.params, {a:'1', b:'yy'}, 'env.params: {a:\'1\', b:\'yy\'}');

			///// lib.env.thirdapp
			test.assertFalsy(env.thirdapp, 'env.thirdapp: false');
			
	});

	casper.run(function() {
		test.done();
	});

});
