---
title: 블로그는 사드세요... 제발
tags:
  - dev
  - js
  - vue
  - ssr
  - geultto
published: 2021-04-04T23:00:58+09:00
---

내가 지금 글을 쓰고 있는 이 블로그는 (몇 번인가 이야기한 적이 있는 것 같긴 한데) Vue를 이용해 바닥부터 올린 사이트이다. 요샌 별로 특이한 방식은 아니지만, 정적으로 페이지를 빌드해서 Netlify에 올리는 방식으로 배포하고 있다. `webpack-dev-server`를 이용해 로컬에 미리보기 페이지를 만들고, 각종 컴포넌트들을 Vue로 만들려다보니 필연적으로 웹팩을 사용하게 됐는데, 웹팩은 정적 웹페이지를 빌드하는 용도가 맞긴 하지만 그렇다고 블로그처럼 수십 수백 개의 페이지를 정적으로 만드는 데 특화된 툴은 아니기 때문에 이런저런 꼼수가 많이 필요해졌다. 각 꼼수마다 장단점이 있는데, 혹시 나처럼 바닥부터 블로그를 올려보려는 사람이 있을까 싶어 어떤 시행착오를 거쳐 성능을 개선하고 개발적인 유연성을 얻었는지 공유해보려고 한다.

# 초기: `html-webpack-plugin`

웹팩으로 정적 사이트를 빌드한다면 대부분은 `html-webpack-plugin`을 사용한다. 적절히 옵션을 전달해주면 웹페이지에 필요한 거의 모든 것들을 내 입맛대로 조절할 수 있다. 처음에는 페이지별로 `html-webpack-plugin`을 전부 따로 선언하면 깔끔하게 페이지가 완성될 거라고 생각했다(지금도 몇 가지 제약조건 하에서는 가장 좋은 방법이라고 생각한다).

```js
const renderPost = (filename) => {
    return new HtmlWebpackPlugin({
        filename,
        template: `./layouts/post.pug`,
        favicon: './favicon.ico',
        chunks: ['post'],
		// ...
    });
};

module.exports = {
	// ...

	plugins: [
		...posts.map(post => renderPost(post.filename)),
	],
}
```

페이지가 늘어날수록 플러그인에는 똑같은 수의 플러그인이 추가된다. 뭐 내가 게시글을 몇천 몇만 개씩 쓸 것도 아니고 플러그인 갯수는 별로 상관없긴 하다. 다만 이 방법에는 사소한 문제점이 있는데, 한 번 `webpack-dev-server`가 실행된 뒤 새로 작성한 게시글은 watch가 되지 않는다는 것이다. 사실 그냥 껐다 켜면 될 일이긴 한데 당시에는 `vuepress`같은 오픈소스 페이지 빌더들을 사용할까도 고민했었기 때문에 이 단점이 굉장히 크게 다가왔던 것 같다.

# 중기: `vue-router` + `prerender-spa-plugin`

모든 게시글을 빠짐없이 watch하기 위해서는 결국 `html-webpack-plugin`을 여러 개 사용한다는 아이디어는 폐기해야 했다. 그럼 무조건 하나의 html 파일만 사용해아 한다는 건데, 한 html 안에서 수많은 페이지들을 어떻게 구분할 것인가를 많이 고민했던 것 같다. 며칠을 고민한 뒤 고른 방법은 `vue-router`로 페이지를 분리한 뒤 `prerender-spa-plugin`으로 모든 페이지를 캡처하는 방식이었다. 실무에서도 단순 html만 서빙하는 페이지에서 많이 사용하는 방식으로 알고 있는데 그래서인지 이전 방식보다 확실히 신뢰도가 오른 느낌이다.

# 후기: `express` + `webpack-dev-middleware`

~~갑자기 분위기 서버~~

몇 주 전엔가 글또에 글을 올렸는데 한 페이지에 댓글이 두 개 뜬다는 제보가 들어왔다(댓글은 [Utterances](https://utteranc.es/)라고 하는 깃헙 기반 앱을 사용하고 있다).

![](./assets/comment-error.png)

문제를 수정한 지금도 여전히 명확한 원인은 못 찾았는데, 아마 `prerender-spa-plugin`은 새 페이지를 캡처할 때 새 창을 띄우는 게 아니라 그냥 URL을 교체하는 듯하다. `vue-router`는 URL이 교체될 때 페이지를 완전히 새로 렌더링하는 게 아니라 필요한 부분만 교체하므로, 아마 댓글 컴포넌트가 사라지지 않은 채 새로 init되면서 두 개가 나타난 것이 아닌가 하는 게 내 생각이다.

내가 뭘 잘못한 게 아니고 플러그인의 근본 구현 자체가 내 블로그와 전면 충돌하고 있었으므로 완전히 새로운 해결책이 필요했다. 이쯤에서 플러그인으로 페이지를 캡처하는 것을 포기하고 아예 캡처 함수를 내가 구현하기로 했다. 자연히 웹팩만으로는 구현이 어려워졌고, 서버를 띄운 뒤 puppeteer 혹은 AJAX 요청을 통해 컨텐츠를 캡처하는 쪽으로 가닥을 잡았다.

기존에 만들어뒀던 컴포넌트들을 최대한 활용하기 위해 프론트엔드 코드를 유지할 방법이 필요했고 마침 그 즈음에 [`webpack-dev-middleware`](https://jeonghwan-kim.github.io/dev/2020/07/18/webpack-dev-middleware.html)라는 라이브러리를 알게 되었다. 정적 에셋은 웹팩으로 빌드하고 라우팅 로직과 게시글 API만 서버에서 담당하게 되면서 전체적인 구조는 오히려 더 깔끔해졌고 사이트맵이나 RSS도 외부 서비스 없이 자체적으로 만들어낼 수 있었다.

서버를 완성하고 나서는 빌드 스크립트를 작성했다. 서버를 띄운 뒤 모든 페이지를 캡처하고, 다시 서버를 닫는 단순한 구조다.

```js
(async () => {
	spawnSync('npm', ['run', 'build:static']);
	const server = spawn('npm', ['run', 'serve']);

	// ...

	for (let post of postNames) {
		await capture(`${host}/post/${post}`, `${dest}/post/${post}/index.html`);
		await captureApi(`${host}/api/post/${post}`, `${dest}/api/post/${post}.json`);
	}

	// ...

	server.kill();
	process.exit();
})();
```

다만 여기서 또 문제가 생겼는데, puppeteer로 캡처하면 분당 GitHub API 최대 호출수를 초과하면서 댓글이 제대로 나오지 않았고(아마 이건 prerender를 사용할 때도 그랬을 것 같긴 하다) AJAX로 html만 긁어오는 방법을 사용하면 API를 콜하지 않기 때문에 홈페이지가 Client Side Rendering으로 구현되게 되어 버렸다. 정적 홈페이지를 표방하다 보니 API 서버를 따로 둘 수 없어 페이지마다 API 덤프를 따로 떠야 하는 건 덤. 빌드할 때마다 댓글에서 GitHub API를 호출해대는 게 좀 불안했기 때문에 약간의 성능 손실과 트래픽 두 배를 감수하고 AJAX 콜을 하는 방식으로 구현했다.

# 최근: Vue SSR

API를 콜해야만 내용이 나와서 문제인 것이라면, *서버에서 미리 API를 콜하면 되는 것이 아닌가?* 하는 생각이 들어 지난 주부터 Vue SSR을 적용해 보았다. 게시글 내용이나 메타정보는 서버에서 미리 렌더링하고, prerender에서 문제가 됐던 외부 스크립트 로딩은 클라이언트단에서 처리하는 방식으로, 화면을 렌더링하기 위한 AJAX 콜이 제거되기 때문에 트래픽과 렌더링 속도 양쪽에서 이점이 있다.

물론 SSR도 단점은 존재한다. 서버에서 미리 DOM을 렌더링할 경우, 가만히 놔두면 클라이언트는 서버가 이미 렌더링을 끝냈다는 사실을 모르기 때문에 빈 데이터를 가지고 화면을 새로 렌더링한다. 이렇게 되지 않기 위해 서버-클라이언트 간 데이터 싱크가 필요한데, 문제는 이 과정에서 html 안에 `window.__INITIAL_STATE__`라는 변수를 삽입하는데 게시글의 경우 이 변수가 상당히 길어진다는 것이다.

```js
if (window.__INITIAL_STATE__) { // 서버에서 렌더링 완료 시 html에 삽입해주는 데이터. 매우 길다
	// vuex store의 state를 교체한다
	store.replaceState(window.__INITIAL_STATE__);
}
```

더 짧은 html을 만들기 위해서는 아예 Vue를 버리고 템플릿 엔진으로 갈아타거나, 외부 스크립트를 분석해서 iframe 등을 직접 삽입하는 방법이 있을 듯한데 이 역시 나름의 제약이 있어 일단 여기서 마무리하려고 한다.

# 여전히 남아 있는 것

이렇게 해서 뭔가 그럴싸한 웹사이트 생성기를 만들긴 했는데 아직 갈 길이 멀다.

1. `webpack-dev-server`를 포기해 버려서 파일이 변경될 때 웹페이지가 자동으로 새로고침되지 않는다.
2. Netlify에서 서브프로세스를 열면 빌드 스크립트가 인식하는 pid와 실제 pid가 달라지면서 프로세스가 종료되지 않는다.
	- [질문](https://stackoverflow.com/questions/66636946/netlify-has-different-pid-on-build-process)을 했는데 아무도 받아주지 않는다...

이래저래 아쉬운 점이 많은 블로그이지만 이런 식으로 계속 최적화하는 데서 오는 재미도 있어서 놓지를 못하겠다.
