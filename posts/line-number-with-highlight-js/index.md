---
title: highlight.js에 줄 번호를 넣어 보자
tags:
    - dev
    - web
    - js
    - highlight.js
published: 2020-02-13T04:10:40+09:00
---

개발 블로그에 코드 블럭은 필수다. 열 줄의 설명보다 한 줄의 코드가 나을 때가 있다. 괜히 개발자는 코드로 말한다는 말이 있는 것이 아니다.

덜렁 `pre` 태그 안에 코드를 넣어 버리면 가독성이 크게 떨어지므로 보통 소스 코드를 넣으면 자동으로 하이라이트해주는 라이브러리를 사용한다. 나는 [`highlight.js`](https://highlightjs.org/)를 선호하는 편인데, Gatsby 같은 데서는 [`Prism.js`](https://prismjs.com/)를 쓰는 것 같더라.

왜 굳이 Gatsby에서 뭘 쓰는지를 찾아봤냐면, 일단 디자인이 깔끔해서 보기 좋았고, 각종 부가 기능을 제공하고 있었기 때문이다. `highlight.js`도 더할 나위 없이 좋은 라이브러리지만 [부가 기능은 지원을 안 하려고 한다](https://highlightjs.readthedocs.io/en/latest/line-numbers.html). 단순성을 침해한다고 생각하는 것 같다.

귀찮아졌지만 방법이 없는 것은 아니다. 개발진의 말마따나 결과물의 단순성을 최대한 보장하려고 하기 때문에, 아웃풋이 어떻게 나오는지만 판단한다면 입맛대로 뜯어고치기 딱 좋다. 이 글에서는 `highlight.js`가 지원하지 않는 줄번호 기능을 구현해보려고 한다.

나는 이 기능을 내 개발 블로그(여기)에서 쓸 생각으로 만들었는데, 이 사이트는 마크다운을 사전에 빌드하여 html 파일만 서빙하고 있다. 문서가 로드된 뒤에 로딩되는 건 Disqus로 충분하다고 생각하기 때문에 여기서는 `highlight.js`로 사전에 소스코드를 변환하고 서빙할 때는 css만으로 동작한다고 가정한다. 즉, [공식 문서에서 제공하는 방법](https://highlightjs.org/usage/)과는 좀 차이가 있다. 공식 문서에서는 문서가 로드된 뒤 동적으로 소스코드를 변환하기 때문이다.

# 동작

백엔드에서 `highlight.js`를 사용할 땐 이렇게 쓴다.

```js
const hljs = require('highlight.js');
const convertedCode = hljs.highlight(lang || 'plaintext', code).value;
```

`hljs.highlight`는 `lang`과 `code` 이렇게 두 개의 인수를 갖는다. 이미 너무 명확한 네이밍이라 굳이 설명이 필요하지는 않을 것 같다. 나는 마크다운에서 코드 변환을 하려고 하고 있기 때문에, 코드 블럭에 언어를 지정하지 않는 경우도 대응해 줘야 해서 기본 인수로 `plaintext`를 전달하기로 했다.

결과는 어떨까? 이런 js 코드 문자열이 있다고 가정하자.

```js
for (let i=0; i<10; i++) {
    console.log('Hello, world!');
}
```

결과물은 이렇다.

```html
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">10</span>; i++) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello, world!'</span>);
}
```

태그가 길어져서 읽기 어렵지만, 스타일을 적용하기 위해 예약어를 `span` 태그로 감싸고 이스케이프 처리 정도만 했을 뿐 원본이 되는 문자열과 거의 차이가 없다는 것을 알 수 있다.

재미있는 것은 변환이 끝난 후에도 문자열이 `\n`으로 줄바꿈을 한다는 것이다. 특별히 설정을 만지지 않는다면 `pre` 태그 안에 들어갈 것이라고 가정하기 때문이다(공식 문서를 뒤져보면 줄바꿈 문자를 `<br>`로 바꿔주는 옵션이 있긴 한데, 여기서 사용할 것은 아니므로 넘어가자.). 하여간 이런 특징으로 인해 라인 단위로 코드를 분리하기 아주 쉬워졌다. 그냥 split만 한 번 해 주면 되니까.

```js:3
const hljs = require('highlight.js');
const convertedCode = hljs.highlight(lang || 'plaintext', code).value;
const splittedCode = convertedCode.split('\n');
```

# 줄 번호 넣기

이미 라인 단위로 코드를 전부 잘라냈기 때문에 줄번호 넣기는 아주 쉽다. 배열의 인덱스값을 적절히 활용하면 된다.

```js:4
const hljs = require('highlight.js');
const convertedCode = hljs.highlight(lang || 'plaintext', code).value;
const splittedCode = convertedCode.split('\n');
const lineAttachedCode = splittedCode.map((code, i) => `${i+1} | ${code}`).join('\n');
```

![기능적으론 완벽한데, 뭔가...](./assets/code-with-line-number.png)

잘 동작하긴 하지만 뭔가 불만족스럽다. 하나하나 수정해보자.

## 맞지 않는 줄번호

줄번호의 자릿수가 바뀔 때마다 코드가 점점 밀려난다. 줄번호 영역이 숫자의 자릿수가 늘어나도 일정한 크기를 유지하도록 작은 숫자에 패딩을 넣어 주자.

```js:6-7,9
const hljs = require('highlight.js');

const convertedCode = hljs.highlight(lang || 'plaintext', code).value;
const splittedCode = convertedCode.split('\n');

const padder = length => num => num.toString().padStart(length, ' ');
const padNumber = padder(splittedCode.length.toString().length);

const lineAttachedCode = splittedCode.map((code, i) => `${padNumber(i+1)} | ${code}`).join('\n');
```

![훨씬 깔끔해졌다](./assets/padding-attached.png)

물론 이 정도로도 개발 블로그를 운영하는 데는 무리가 없지만, 아직 좀 더 개선할 여지가 남아 있다.

## 코드를 복사하려는데 줄번호도 같이 복사된다

인터넷에서 내가 찾는 아주 멋진 솔루션 코드를 찾았다고 해 보자. 적당히 소스를 긁어다가 내 입맛대로 고쳐보고 싶은데, 내가 앞서 설명한 방법으로 만든 블로그라면 코드를 복사할 때 줄번호도 같이 복사된다. html 마크업 상으로는 줄번호와 코드를 구분하는 마땅한 기준이 없기 때문이다.

따라서, 한 줄을 **줄번호 영역**과 **코드 영역**으로 나누어 줄 필요가 있다.

```js:10
const hljs = require('highlight.js');

const convertedCode = hljs.highlight(lang || 'plaintext', code).value;
const splittedCode = convertedCode.split('\n');

const padder = length => num => num.toString().padStart(length, ' ');
const padNumber = padder(splittedCode.length.toString().length);

const lineAttachedCode = splittedCode
    .map((code, i) => `<code class="line-number">${padNumber(i+1)}</code><code class="code">${v}</code>`)
    .join('\n');
```

물론 이렇게 한다고 바로 줄번호가 복사할 수 없는 상태가 되지는 않는다. 여기서부터는 css의 도움이 필요하다.

```css
.line-number {
    user-select: none;
}
```

`user-select` 속성은 텍스트를 드래그하여 선택할 수 있는지 여부를 결정해 준다. 여기에 `none`을 주면 선택할 수 없는 상태가 된다.

![이제 마음껏 코드를 복사할 수 있다](./assets/user-select.png)

# 정리

내가 실제로 사용하는 코드는 여기에 라인 강조 기능 같은 것을 추가한다든지 해서 좀 더 마개조한 것이다. 라이브러리 자체의 단순성 덕에 오히려 이것저것 시도해 보기 좋은 것 같다. 이미 다 만들어진 기능을 커스텀하는 것이 까다롭다면, 아예 단순한 라이브러리로 시작해 기능을 쌓아 가는 것도 좋은 경험일 듯하다. ~~그리고 잘 만든 건 공유해 주세요 만들기 귀찮아요~~
