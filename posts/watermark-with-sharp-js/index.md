---
title: sharp.js로 자동 워터마크 이미지 제작하기
tags:
  - js
  - sharp.js
  - geultto
published: 2021-05-02T23:18:53+09:00
---

최근에 카톡에 깃헙 링크를 공유하다가 멋진 오픈그래프를 발견했다. 처음엔 깃헙에 오픈그래프 이미지를 넣을 수 있는 기능이 생긴 건 줄 알았는데 깃헙에서 자동으로 만들어주는 것 같다.

![내 레포도 잘 나온다](./assets/opengraph.png)

문득 이걸 내 블로그에도 적용해보면 멋지겠다고 생각했다. 예전에 [Netlify Large Media로 이미지 호스팅하는 법](/post/netlify-large-media)에 대해서 글을 썼던 적이 있는데 그 때 염두에 두고 있었던 라이브러리인 [sharp.js](https://sharp.pixelplumbing.com)를 사용해 보기로 했다. 내 목표는 오픈그래프를 제작하는 것이지만, 그러려면 글 메타정보도 불러와야 하고 맨 첫 이미지 가져오는 기능도 만들어야 하고 귀찮아질 것 같아서 이 글에서는 이미지 사이즈를 자동으로 조절하고 워터마크를 만들어 보기로 하겠다.

> 워터마크란?
>
> 이미지의 저작자를 표시하기 위해 이미지 위에 추가하는 텍스트 내지는 이미지를 말한다. 보통 일러스트레이터나 만화가들이 자신이 만든 저작물을 홍보할 때 이미지 불펌을 막기 위해 결과물의 화질을 낮추고 그 위에 큰 텍스트를 덮어씌워서 배포하곤 한다.

# 설치하기

sharp.js는 node 10 이상 버전부터 지원한다.

```sh
npm install sharp
```

직접적인 관련은 없지만, 텍스트, 그라디언트 등 개발자가 동적으로 생성한 컨텐츠를 집어넣기 위해서는 일반적으로 SVG를 이용한다. 여러가지 방법이 있겠지만 나는 [jsdom](https://github.com/jsdom/jsdom) 위에서 [D3](https://d3js.org)로 생성한 SVG를 사용하려고 한다. 이 글에서도 SVG 조작에는 D3를 사용하고 있다. D3를 사용할 줄 모르면 이해하기 어려운 부분이 있을 수 있으니 이 부분은 미리 양해를 구한다.

```sh
npm i d3 jsdom
```

# 이미지 불러오고 저장하기

가장 기본적인 이미지 객체 생성법은 파일 이름으로 불러오는 방식이다. 여기서는 이미 있는 이미지를 수정하는 것이므로 파일명으로 불러오는 방식을 사용하겠다.

```js
const sharp = require('sharp');

(async () => {
	const image = await sharp('./my-image.jpg');
})();
```

완성된 이미지는 다양한 포맷으로 저장할 수 있는데 이 때도 파일로 저장할지, Buffer 객체를 받을지를 결정할 수 있다. 전자는 완성된 파일을 저장할 때 쓰고 후자는 불러온 이미지를 다른 이미지에 추가한다거나 할 때 사용한다.

```js
(async () => {
	await image.png().toFile('./output.png'); // png 파일로 저장
	await image.jpeg().toFile('./output.jpg'); // jpg 파일로 저장
	await image.png().toBuffer(); // png 포맷 Buffer 객체로 저장
})();
```

어떤 포맷으로 입출력을 받을 수 있는지는 공식 문서에서 확인할 수 있다.

- <https://sharp.pixelplumbing.com/api-constructor>
- <https://sharp.pixelplumbing.com/api-output>

## 보너스: axios로 웹에서 불러온 이미지를 sharp 객체로 만들기

옵션에 `responseType: 'arraybuffer'`를 추가하면 sharp.js에서 바로 사용할 수 있는 버퍼 스트링으로 이미지를 내려받을 수 있다. gravatar처럼 웹에 저장해 둔 이미지를 불러와야 하는 상황에서 유용하다.

```js
const getImageFromWeb = async (url) => {
    return axios.get(url, {
        responseType: 'arraybuffer',
    }).then(({data}) => {
        return sharp(data);
    });
};
```

# 이미지 크기 줄이기

웹페이지에 넣을 이미지는 지나치게 크기가 크고 화질이 좋으면 남들의 소중한 데이터를 고갈시키기 쉽다. 개발자 블로그에 올라오는 이미지래봐야 참고 이미지에 가까우니 적절한 크기로 사이즈를 줄여서 데이터 부담을 줄여주도록 하자. width, height 중 한 값만 주어질 경우 나머지 값은 적절하게 조정된다.

```js
(async() => {
	const resized = await image.resize({ width: 800 });
})();
```

## 이미지 크기 재기

가로 길이가 800픽셀보다 작은 이미지를 800픽셀에 맞추면 이미지가 깨질 것이다. 이미지의 크기를 미리 알 수 있다면 이런 상황을 미연에 방지할 수 있다.

```js
(async() => {
	const maxWidth = 800;
	const { width } = await image.metadata();

	if (width > maxWidth) {
		const resized = await image.resize({ width: maxWidth });
	}
})();
```

# 이미지에 컨텐츠 추가하기

이미지 크기를 줄였으니 진짜 본격적으로 이미지에 워터마크를 추가해 보자. 로고나 홈페이지 주소 같은 것을 넣으면 좋을 것 같으니 이미지와 텍스트 넣는 방법을 알면 되겠다.

## 이미지에 다른 이미지 추가하기

이미지를 다른 이미지에 추가하기 위해서는 추가할 이미지를 Buffer 객체로 바꾸어 주어야 한다. 이건 아래 소개할 텍스트 삽입에서도 마찬가지이다. 공식 문서에서는 일반 문자열도 지원한다고 되어 있는데 실제로 실행해 보면 에러가 난다. 워터마크가 워터마크를 붙이려는 이미지보다 크면 에러가 나니 적절히 사이즈를 조절해주도록 하자.

```js
(async() => {
	const image = await sharp('./my-image.png');
	const watermark = await sharp('./watermark.png').toBuffer();
})();
```

이미지를 포함한 컨텐츠 삽입 시에는 `composite`이라는 메서드를 사용한다. 입력으로는 배열을 받으며, 뒤에 삽입한 컨텐츠일수록 위쪽에 나타난다. 포토샵을 만져본 적 있는 사람이라면 쉽게 이해할 수 있을 듯하다. 컨텐츠는 특정 위치를 지정하여 삽입할 수도 있지만, `gravity` 옵션으로 정중앙, 오른쪽 등 적절한 위치에 알아서 배치되게 만들 수도 있다. 물론 그랬다가는 마진 없이 너무 구석에 척 붙어버리므로 예쁘게 만들고 싶으면 `top`, `left`를 사용하자. 이미지가 너무 바깥으로 나가면 나간 만큼이 잘려나간다.

```js
(async() => {
	const watermarked = await image.composite([{
		input: watermark,
		gravity: 'southeast',
	}]);
})();
```

![gravity: southeast를 사용한 예시. 오른쪽 아래 끝부분에 딱 붙어 있다](./assets/gravity.png)

## 이미지에 텍스트 집어넣기

마지막으로 이미지에 텍스트를 추가해 보자. sharp.js 자체에는 텍스트를 자동생성하는 기능 같은 것은 없다. 다만, 이미지 입력 포맷으로 SVG를 지원하기 때문에 아까 소개한 D3와 jsdom을 이용해 동적으로 텍스트 이미지를 생성해낼 수 있다. 이미지와 마찬가지로 완성한 SVG는 Buffer 객체로 변환하여 넣어주자. 글자 너비를 측정할 수 있다면 width를 넣지 않아도 될 텐데 아직 거기까지는 어떻게 하는지 모르겠다.

```js
const { JSDOM } = require('jsdom');
const d3 = require('d3');

const generateText = (text, width, height, fontSize, color) => {
    const dom = new JSDOM('<body></body>');
    const body = d3.select(dom.window.document.body);
    const svg = body.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('xmlns', 'http://www.w3.org/2000/svg');

    svg.append('text')
        .text(text)
        .attr('x', 0)
        .attr('y', fontSize)
        .style('font-size', `${fontSize}px`)
        .style('fill', color);

    return body.html();
};

(async() => {
	const watermarked = await image.composite([{
		// ...
	}, {
		input: Buffer.from(generateText('Hello, world!', 100, 16, 16, 'white')),
		top: meta.height - 32,
		left: 16,
	}]);
})();
```

![텍스트 워터마크를 삽입한 이미지](./assets/text-watermark.png)

# 정리

이렇게 해서 이미지를 적절한 사이즈로 줄이고, 이미지나 텍스트로 된 워터마크를 추가하여 내 블로그의 저작물임을 표시할 수 있도록 만들어 보았다. 이 밖에도 sharp.js에서 지원하는 여러가지 기능들이 있는데 잘만 이용하면 거의 포토샵을 코드로 짜는 수준까지 가능할 것 같다. 언제가 될지는 모르겠지만 다음에는 좀 더 미려한 예제를 만들어서 소개해보겠다.
