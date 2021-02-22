---
title: CSS 중앙 정렬의 역사
tags:
  - dev
  - css
  - geultto
published: 2021-02-21T21:45:47+09:00
---

가운데 정렬은 어렵다.

근본적인 이유를 파고들면 부모 태그와 자식 태그가 어떤 속성을 가졌냐에 따라 가운데 정렬에 사용되는 속성이 무시되거나 다르게 해석될 여지가 있기 때문이다. 요새는 flex가 사실상 표준이라 새 사이트나 페이지를 만들 때엔 그걸 쓰면 되지만 옛날엔 그렇지 못했다. 오늘은 flex가 없던 시절부터 지금에 이르기까지 CSS에서 가운데 정렬을 어떻게 처리했는지를 이야기해보려고 한다.

설명을 단순화하기 위해  `--webkit-` 등의 폴리필은 사용하지 않는다고 가정한다. 또, 사용 가능한 속성이라고 해도 브라우저에 따라 보이는 모양은 조금씩 다를 수 있다는 사실을 미리 알린다. 가운데 정렬한 컴포넌트를 왼쪽에 보여주는 수준인 건 아니고, 적게는 1~2px, 많게는 한 글자 정도의 공간은 틀어질 수 있다는 뜻이다.

또, html 꼼수가 들어가는(주석을 사용해서 마진을 제거하는 기법이 있다) 방식도 최대한 제외했다. 애초에 만들기도 불편하고 코드 포매터를 돌렸다간 다 깨지기 십상이다.

# 가운데 정렬의 분류

무슨 분류까지 필요한가 생각할 수 있지만 부모자식의 속성과 브라우저 지원범위에 따라 3분카레 수준의 난이도가 될 수도, 대충 땜빵으로 가운데 정렬처럼 보이게 해야 하는 수준이 될 수도 있다. 일반적으로는 부모와 자식의 `display` 속성에 따라 분류한다.

- 부모가 `block`/`inline-block`일 때
	- 자식이 `inline`/`inline-block`일 때
	- 자식이 inline 계열이 아닐 때
- 부모가 `flex`일 때

이 중 자식 태그가 `inline` 혹은 `inline-block`인 경우 모든 브라우저에서 `text-align`을 이용해 가운데 정렬이 가능하므로, 그렇지 않은 케이스에 대해서 알아보도록 하자.

# IE 6 이상

[위키백과에 따르면](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7_%EC%9D%B5%EC%8A%A4%ED%94%8C%EB%A1%9C%EB%9F%AC_6) IE 6는 윈도우 XP에 기본 탑재되는 브라우저로 2001년에 출시되었다. 라떼를 한 번 시전해 보자면 나는 그 때 초등학교에 막 입학했었는데, 그때도 네이버나 다음같은 유명한 웹 서비스들이 있었으니 당시에도 가운데 정렬은 많은 웹개발자들의 골치를 썩이고 있었을 것이다.

재미있게도 이 정렬법은 요즘에도 가끔 사용한다. 무슨 고릿적 기술을 지금도 쓰느냐 하겠지만 왜 네이버는 아직도 [네이버 최적화 버전 IE](https://tools.naver.com/service/internet-explorer/index.nhn)를 제공하지 않는가. 여전히 구형 IE를 사용하는 유저들의 수요가 있고 이 사람들의 접근을 막을 때 가운데 정렬을 사용해야 한다면 채택해볼 법하다. 나 같은 경우엔 IE 지원종료 페이지를 만들 때 썼는데, 유저가 어떤 브라우저로 들어올 지 모르므로 최대한 보수적으로 작업했다.

![다음카페 IE 8 이하 지원 종료 페이지. IE 6까지 대응한다.](./assets/ie-support.png)

IE 6의 특징이라면 가운데 정렬에 자식의 너비/높이값을 사용한다는 것이다. Sass나 LESS를 사용하는 서비스라면 값을 변수에 저장해 두고 사용하는 방식이 유용할 수 있겠다.

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	top: 50%;
	left: 50%;

	width: 120px;
	height: 100px;
	margin-top: -60px; /* -width/2 */
	margin-left: -50px; /* -height/2 */
}
```

보면 알겠지만, 자식 컴포넌트의 크기를 수정하면 반드시 마진을 다시 계산해야 하고 `position` 값을 강제하는 등 번거로운 점이 많다.

단, 세로 정렬이 필요없는 경우 깔끔하게 정렬하는 방법이 있다. 이 방법은 `flex`가 평정한 지금도 단일 최상단 컨테이너를 가운데 정렬할 때 많이 쓴다.

```css
.child {
	width: 120px;
	height: 100px;
	margin: 0 auto;
}
```

# IE 8 이상

IE 8부터 `display: table` 속성이 지원된다.

```css
.parent {
	display: table;
	width: 100%;
	height: 100%;
}
.child {
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
```

이전 버전과의 차이를 설명하자면 일단 `table`은 기본적으로 너비값이 지정되어있지 않다(특별히 세팅하지 않은 `block`의 너비 초기값은 `100%`이다). 따라서 부모 컴포넌트에도 너비/높이값을 지정해 주어야 한다. 풀스크린인 경우 `html>body>...>.parent`로 이어지는 모든 태그에 높이를 `100%`로 지정해 줘야 하기 때문에 조금 귀찮다.

또, `table-cell`은 길이를 지정할 수 없으므로, 만약 자식 컴포넌트에 반드시 길이를 지정해야 한다면 손자 컴포넌트에 길이값을 추가하는 방식을 회피할 수 있다.

# IE 9 이상

IE 9부터 `transform`이 일부 지원된다.

```css
.parent {
	position: relative;
}
.child {
	position: absolute;
	top: 50%;
	left: 50%;

	width: 120px;
	height: 100px;
	transform: tranlate(-50%, -50%);
}
```

IE 6 버전과 거의 차이가 없고 역마진을 `transform`으로 대체한 것이다. 너비와 높이에 영향을 받지 않기 때문에 확실히 유지보수성이 늘어난다. 여타 다른 장단점은 IE 6와 동일하다.

# IE 11

`flex`가 지원된다. 유저가 구형 브라우저를 사용하지 않는다면 더할나위 없는 해결책이다. 모바일 전용 페이지에서는 거의 걱정없이 사용해도 된다(젤리빈 이하에서는 깨지긴 하지만, 카카오톡도 롤리팝 미만 OS 지원을 끊은 마당에...).

```css
.parent {
	display: flex;
	flex-direction: column; /* row일 땐 align-items와 justify-content가 바뀜 */
	align-items: center;
	justify-content: center;
}
```

`.child`가 정의되지 않는다. 이게 무슨 의미를 가지냐면, `position`을 잘못 주지 않는 한 자식 컴포넌트가 그 어떤 속성을 갖고 있더라도 가운데 정렬을 보장한다는 것이다. `flex`는 앞서 설명한 정렬 방법 중 손자 컴포넌트 없이 가운데 정렬한 상태로 자식 컴포넌트를 여러 개 쌓을 수 있는 유일한 방식이다. 정렬 옵션도 다른 방식에 비해 월등히 많다.

```html
<!-- 이런 구조일 때 가로세로 정렬이 모두 깨지지 않는 건 flex뿐이다 -->
<div class="parent">
	<div class="child"></div>
	<div class="child"></div>
	<div class="child"></div>
</div>

<!-- 다른 방식은 이렇게 자식을 하나만 써야 한다 -->
<div class="parent">
	<div class="child">
		<div class="grandchild"></div>
		<div class="grandchild"></div>
		<div class="grandchild"></div>
	</div>
</div>
```

# 요약

브라우저에 따라 방법도 다양하고 각 방법마다 제약도 각각 다르다보니 이걸 전부 외워 쓰기는 힘들다. 다행히 이런 걸 알아서 세팅해주는 사이트가 하나 있다.

<http://howtocenterincss.com/>

지원하는 브라우저에 따라 적당한 값을 설정하면 알아서 html 코드를 생성해주는 고마운 사이트이다. 방법마다 어떤 장단이 있는지만 가볍게 알아두고 코드는 알아서 만들어 주는 것을 갖다 쓰면 편하다.
