---
title: 나만의 웹팩 로더 만들기
tags:
  - js
  - webpack
  - tutorial
  - geultto
published: 2020-11-10T19:37:32+09:00
---

도메인 값이 아까워서 블로그를 활성화시켜야겠다는 연초의 각오가 무색하게 또 블로그를 몇 달 묵혔다. 글감은 계속 쌓이는데 마음 잡고 글 쓸 일이 없던 찰나 지인의 소개로 [글또](https://www.notion.so/ac5b18a482fb4df497d4e8257ad4d516)라는 프로젝트를 알게 되어 5기로 참가하게 되었다. 회사 일이 크게 바쁘지 않으면 아마 2주에 한 번 꼴로 6달 정도 글을 발행하게 될 것이다.

첫 글을 무엇으로 쓸까 고민하다 올해 사내에서 발표했던 웹팩 로더 튜토리얼에 생각이 미쳤다. 발표가 실습 방식이었기 때문에 이 글도 실습을 하면서 따라할 수 있도록 [소스코드 전문](https://github.com/znagadeon/webpack-loader-tutorial)을 준비했다. 2020년 4월에 진행한 실습인 관계로 웹팩 버전은 4이다. 또, 발표를 위해 최대한 단순화한 소스코드를 준비한 것이므로 이 코드를 그대로 현업이나 사이드 프로젝트에 사용하려면 몇 가지 추가 예외처리가 필요할 것이다. 실습에 참고하길 바란다.

# 로더란?

ES6+, 혹은 타입스크립트가 프론트엔드 개발의 대세가 된 이후로 소스 번들러는 사실상 웹 개발에 반 필수가 되었다. 사이드 프로젝트에는 parcel처럼 zero-config를 지향하는 번들러도 많이 사용하지만, 현업이란 것이 항상 깔끔하고 아름답지만은 않기 때문에 이런저런 추가 설정을 붙이다 보면 아마 웹팩을 주로 사용하게 될 것이다.

다른 번들러와 차별화되는 웹팩의 특징을 꼽자면 역시 **로더(loader)** 다. 웹팩 설정 파일을 읽어본 적이 있다면 아마 이런 내용을 한 번쯤 봤을 것이다.

```js
module.exports = {
	// ...
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
		],
	},
	// ...
};
```

저 파일 확장자같이 생긴 건 뭐고 `babel-loader`는 또 무엇인가? 웹팩은 다양한 확장자의 파일들을 받아서 웹이 이해할 수 있는 포맷으로 바꾸어주는 역할을 수행한다. 다만 웹팩 자체에는 이런 능력이 없다. 그렇다면 지금까지 우리가 사용해 왔던 최신 언어들은 어떻게 알아서 잘 js 파일들로 바뀌었을까? 바로 이걸 해 주는 것이 로더이다. 로더는 **파일의 이름을 기반으로 하여 해당 파일의 내용을 브라우저가 이해할 수 있는 언어, 정확히 말하자면 js 소스로 바꾸어 주는 역할** 을 수행한다.

방금 설명한 로더의 역할을 좀 더 자세히 곱씹어보자.

> 파일의 내용을 js 소스로 바꾸어준다

이걸 프로그래머식으로 해석하면 이렇게 된다.

> 문자열을 입력으로 받아 js 포맷 문자열을 반환한다

즉, 로더는 문자열을 각각 입력과 출력으로 갖는 함수의 형태를 갖는다. 나중에 설명하겠지만, 로더가 가지고 있는 유틸 함수에 `this`로 접근하기 때문에 arrow function은 사용하면 안 된다.

```js
module.exports = function (source) {
	return '';
};
```

`source`는 파일의 내용물을 문자열로 바꾼 것이고, 이 값을 적당히 주물러서 반환해주면 된다. 반환되는 문자열은 자바스크립트 엔진으로 해석할 수만 있다면 무엇이든 상관없다. 지금처럼 빈 문자열을 반환해도 상관없고, `console.log('Hello, world!');` 같은 것도 된다. 하지만 보통 받아온 `source`를 기반으로 뭔가를 쓸 수 있게 해 줘야 하기 때문에, 대개는 이런 형태를 띤다.

```js:2
module.exports = function (source) {
	return `module.exports = \`${doSomething(source)}\``;
};
```

여기까지 알았다면 일단 로더를 작성하기 위해 필요한 최소한의 지식은 알게 된 것이다.

# 로더 만들어 보기

이제부터 진짜로 로더를 만들어 보자. 우리가 이 글에서 만들어 볼 로더는 마크다운 로더로, 마크다운 파일을 받아 js에서 사용할 수 있는 포맷으로 변환해주는 것이다.

시작하기 전에 미리 웹팩 설정 파일을 작성해야 한다. 요새는 페이즈별로 설정 파일을 따로 작성하는 게 일반적이지만, 우리는 여기서 로더를 만드는 것이지 설정 파일에 대해 다루는 것이 아니므로 설정 파일은 하나만 사용하도록 하자.

```js
// webpack.config.js
module.exports = {
	// ...
	module: {
		rules: [
			{
				test: /\.md$/,
				loader: './loaders/md-loader.js',
			},
		],
	},
	// ...
};
```

```js
// src/main.js
const html = require('./sample.md');
document.write(html);
```

내용은 간단하다. `sample.md`의 내용을 불러와서 화면에 그려주면 된다. 변수명이 `html`인 데서 눈치챘겠지만 단순히 텍스트를 불러올 뿐 아니라 이를 html 포맷으로 변환해주는 작업도 진행할 것이다. 이전 문단에서 작성했던 코드를 인용하자면 `doSomething` 부분을 마크다운 컨버팅 함수로 바꿔주면 된다. 여기서는 `marked`라고 하는 잘 만들어진 마크다운 컨버터를 사용하겠다.

```js:1,4
const marked = require('marked');

module.exports = function (source) {
	return `module.exports = \`${marked(source)}\``;
};
```

이렇게 작성한 뒤 웹팩을 실행하면 원하는 결과를 확인할 수 있다.

![](./assets/loader-result-1.png)

## option 사용하기

위에서 사용한 `marked`라는 라이브러리는 커스텀 옵션의 지원이 깔끔한 편이다. 예를 들어 Gitub-Flavored Markdown을 사용할지 여부 등을 옵션으로 받을 수 있다. 이 옵션을 로더를 사용하는 유저가 자율적으로 선택하게 하고 싶다면 어떻게 해야 할까? 로더는 웹팩으로부터 옵션을 받아 이 값을 함수를 실행하는 과정에서 사용할 수 있다.

```js:8
// webpack.config.js
module.exports = {
	// ...
	module: {
		rules: [{
			test: /\.md$/,
			loader: './loaders/md-loader.js',
			options: { gfm: false },
		}],
	},
	// ...
};
```

```js:4
const marked = require('marked');

module.exports = function (source) {
	return `module.exports = \`${marked(source, this.query)}\``;
};
```

![](./assets/loader-result-2.png)

`gfm` 옵션을 껐더니 로더가 테이블을 렌더링하지 않도록 바뀌었다.

## md-loader 분해하기

사실 마크다운 로더 자체는 분해가 필요하지 않을 정도로 구조가 간단한 편이다. 1) 마크다운을 html로 변환해서 2) 그걸 js 문자열로 반환해주면 되기 때문이다. 하지만 어쨌든 마크다운 로더가 두 가지 일을 하는 것은 분명해 보인다. 실습도 해 볼 겸 각각의 기능을 따로 로더로 만들어 보자. 1번 로더를 `md-loader`로, 2번 로더를 `html-loader`라고 부를 수 있겠다.

두 개 이상의 로더를 연속해서 사용할 때 웹팩에서는 `use` 옵션을 사용한다. 순서는 오른쪽에서 왼쪽, 혹은 아래에서 위로 진행한다. 예를 들어 옵션을 아래와 같이 작성한다면 `md-loader` 다음에 `html-loader`가 실행된다.

```js:8-12
// webpack.config.js
module.exports = {
	// ...
	module: {
		rules: [{
			test: /\.md$/,
			use: [
				'./loaders/html-loader.js',
				{
					loader: './loaders/md-loader.js',
					options: { gfm: false },
				},
			]
		}],
	},
	// ...
};
```

로더를 연속해서 사용할 때 기존과 다른 점은 더이상 입출력값을 항상 로더가 요구하는 형식으로 고정하지 않아도 된다는 점이다. 함수 여러개를 합성한다고 생각하면 편하다. 위 설정 파일을 예시로 사용한다면 \(newLoader = htmlLoader \cdot mdLoader\)이고, \(newLoader\)만 문자열 입력/js 출력이 되도록 하면 되는 것이다. `md-loader`의 출력을 js가 아닌 html로 바꿔 보자. 아까와 똑같은 결과가 나온다면 성공이다.

```js
// loaders/md-loader.js
const marked = require('marked');

module.exports = function (source) {
	return marked(source, this.query);
};
```

```js
// loaders/html-loader.js
module.exports = function (source) {
	return `module.exports = \`${source}\``;
};
```

## 파일 저장하기

마크다운으로 글을 써 본 적이 있다면 알겠지만 마크다운에는 글 뿐 아니라 이미지도 넣을 수 있다. 하지만 지금까지 만든 로더로는 이미지를 가져올 수 없다! 설령 이미지를 넣더라도 깨진 이미지가 뜰 것이다.

![](./assets/image-load-failed.png)

이렇게 로더가 실행되는 도중 추가적인 파일을 불러오는 경우가 있기 때문에 로더 API에는 파일을 내보내주는 함수가 내장되어 있다.

```js:6-9
// loaders/html-loader.js
// ...
module.exports = function (source) {
	const images = getImagePaths(source);
	images.forEach(image => {
		this.emitFile(
			image,
			this.fs.readFileSync(path.join(this.resourcePath, '..', image)),
		);
	});

	return `module.exports = \`${source}\``;
};
```

이렇게 하면 정상적으로 이미지를 확인할 수 있다.

![](./assets/image-load-success.png)

### 다른 로더 트리거하기

이런 식으로 직접 파일 핸들링을 해도 되지만, 기성(?) 라이브러리 중 `file-loader`라는 좋은 라이브러리가 있으니 그걸 활용해보는 것도 좋을 것 같다. `module.exports`를 사용했던 것과는 반대로 다른 로더를 트리거하고 싶을 때는 `require`문을 사용한다.

```js:8-10
// webpack.config.js
module.exports = {
	// ...
	module: {
		rules: [{
			// ...
		}, {
			test: /\.(jpe?g|png|gif)$/,
			loader: 'file-loader',
			options: { name: '[name].[ext]' },
		}],
	},
	// ...
};
```

```js:5,7
// loaders/html-loader.js
// ...
module.exports = function (source) {
	const imageScripts = getImagePaths(source)
		.map(image => `require('${image}');`);

	return `${imageScripts}module.exports = \`${source}\``;
};
```

## async

지금까지는 로더를 실행하면 비동기적인 실행 없이 바로 결과를 리턴해주는 함수만 작성했다. 하지만 자바스크립트 세계에서는 모든 코드가 항상 동기적으로 작동하지는 않는 법이다. 당장 아까 작성했던 로더에도 `readFileSync`를 사용했는데, 이를 비동기 함수로 바꾼다면 로더가 제대로 동작하지 않을 것이다. 이런 경우에 대비해 로더 API에 `this.async()`라는 함수가 존재한다.

간단히 예시를 들어 보자. `mdlint-loader`를 만들어 현재 마크다운 파일에 데드링크가 없는지 확인해볼 것이다.

```js:6-8
// webpack.config.js
module.exports = {
	// ...
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.md$/,
			loader: './loaders/mdlint-loader.js',
		}, {
			// ...
		}],
	},
	// ...
};
```

```js:4,14
// loaders/mdlint-loader.js
// ...
module.exports = function (source) {
	const callback = this.async();

	const links = getLinks(source);
	const promises = links.map(link => axios({
		method: 'GET',
		url: link,
		timeout: 300,
	}));

	Promise.all(promises).then(() => {
		callback(null, source);
	});
};
```

데드링크가 없으면 성공적으로 `callback`을 실행할 것이다. `callback`은 총 두 개의 인자를 받는데, 첫 인자로 `Error`를, 두 번째 인자로 기존의 리턴값을 받는다. 만약 에러를 발생시킬 필요가 없다면 첫 번째 인자를 `null`로 두면 된다. 그럼 이번에는 데드 링크가 있는 경우 예외를 발생시켜 보자.

```js:8-14
// loaders/mdlint-loader.js
// ...
module.exports = function (source) {
	// ...
	Promise.all(promises).then(() => {
		callback(null, source);
	}).catch(err => {
		// warning을 뱉을 때
		this.emitWarning(new Error('Dead link found!'));
		callback(null, source);

		// error를 뱉을 때
		this.emitError(new Error('Dead link found!'));
		callback(err);
	});
};
```

단순 경고처리만 필요하다면 첫 인자로 `null`을, 에러를 발생시켜야 한다면 에러 객체를 전달하면 된다. 이제 마크다운 내부에 데드링크가 있다면 warning 혹은 error을 뱉게 만들 수 있다.

![](./assets/dead-link-found.png)

# 더 공부하고 싶다면

다시 한 번 말하지만 이 소스는 튜토리얼용으로 실습을 위해 제작한 것이고, 현업에서 바로 사용하기에는 무리가 있다(경우에 따라서는 내가 미처 몰랐던 안티패턴이 있을 수도 있겠다). 로더가 어떤 방식으로 동작하는지 이해하되, 실제로 로더를 직접 작성할 일이 생긴다면 이미 기존에 배포되어 있는 로더 소스나 공식 문서를 참고해가면서 작성하면 좋겠다. 개인적으로는 공식문서는 꼭 필요한 곳을 긁어주지 못해서(변수 타입이랑 이름은 있는데, *그래서 여기에 대체 무슨 값을 넣어야 되는데?* 에 대한 고려가 부족한 느낌...) 기존 로더들을 더 많이 참고했던 것 같다.

## 참고 링크

- [프론트엔드 개발환경의 이해: 웹팩(기본) - 김정환 블로그](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html#3-%EB%A1%9C%EB%8D%94)
- [Loader Interface](https://webpack.js.org/api/loaders/)
