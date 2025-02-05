---
tags:
  - geultto
---

# husky를 이용한 정적 분석 자동화

[지난 글](https://znagadeon.dev/post/format-my-code/index.html)에서 editorconfig, prettier, eslint를 이용해 코드를 정적 분석하고 일관된 스타일을 적용하는 법에 대해 알아보았다. 분명 이 작업을 통해서 코드의 품질이 좋아지고, 놓치는 버그의 수도 확연히 줄어들었을 것이다. 하지만 과연 실제로도 그럴까? 충분히 꼼꼼한 사람이 아니라면 이런 일이 쉽게 발생할 수 있다.

> PR 올렸어요. 아차! lint 돌리는 걸 깜빡했네요. 잠시만요...

문제는 **정적 분석을 손으로 돌려야 한다**는 점이다. 코드의 문제점을 자동으로 검출해주지만 그 과정을 사람이 명령해야 그제서야 느릿느릿 시작한다면 컴퓨터가 너무 나태하지 않은가? 이래서야 아주 일을 잘 하는 월급루팡이나 다를 게 없다. 이번 글에서는 이 월급루팡 컴퓨터가 스스로 알아서 일하게 만들어 보자.

## 커밋할 때 자동으로 정적 분석 돌리기

애초에 커밋하는 시점에 정적 분석이 끝나 있었다면 이런 문제는 발생하지 않았을 것이다. 보통 이런 문제를 해결하기 위해서 git hook이라는 기능을 사용한다. hook은 한국어로 갈고리라는 뜻인데, git hook은 말하자면 git이 실행되는 중간중간 갈고리를 걸어서 미리 등록해둔 내 스크립트를 실행시켜주는 것이다.

다만 조금 아쉬운 점은 git hook 스크립트는 `.git` 디렉토리 밑에 있다는 것이다. 즉 통상적인 방법으로는 버전 관리 시스템에 올릴 수 없다는 말이고, *우리 팀은 이런 git hook을 사용하고 있으니 이렇게 사용하라*고 위키나 README에 구전처럼 전해야 한다.

이를 아쉽게 생각한 어느 개발자가 `husky`라고 하는 툴을 개발했다. `husky`는 git hook을 현재 코드베이스에서 관리할 수 있게 해주며, 따라서 설치만 잘 되어 있다면 어떤 환경에서든 동일한 hook을 사용함을 보장하게 된다. 백문이 불여일견, 일단 설치해서 따라해 보자.

> `husky`는 현재 v5까지 출시되어 있다. 오픈 소스 프로젝트나 후원자 프로젝트에 한해 v5를 사용할 수 있고, 완전 무료로 사용하고 싶은 경우 v4를 사용해야 한다.
>
> > You're viewing documentation for husky v5, which is free to use in Open Source projects ❤️ and in early access for Sponsors 🎁. To use this new version at work, you can become a sponsor on GitHub Sponsors or Open Collective.
> >
> > If you can't sponsor Husky, that's okay, husky v4 is free to use in any project.

```sh
npm i -D husky
```

설치한 뒤 `package.json`에 hook을 추가할 수 있다.

```json
{
	"husky": {
		"hooks": {
			"pre-commit": "echo \"Hello, world!\""
		}
	}
}
```

![성공적으로 husky가 실행된 모습](./assets/hello-husky.png)

이제 `pre-commit` 훅에 정적 분석 스크립트를 추가하면, 커밋을 할 때마다 코드 포매팅을 강제할 수 있다.

```json
{
	"husky": {
		"hooks": {
			"pre-commit": "prettier --write . && eslint ."
		}
	}
}
```

## 수정된 파일만 분석할 수는 없을까?

여기까지 따라해 보았다면 뭔가 답답함을 느낀 독자가 있을 것이다. 커밋 속도가 엄청나게 느려지기 때문이다. 이전에는 설명하지 않았지만 이전에 내가 소개한 정적 분석 시스템에는 실서비스에 적용하기엔 좀 뭣한 치명적인 단점이 있었는데, 바로 **한 번 정적 분석 툴을 돌리면 모든 파일이 전부 분석 범위 안에 들어간다**는 것이다.

![0.5초의 압박](./assets/too-long.png)

커밋만 느려지는 게 아니다. 여러분이 작업 중인 프로젝트가 적게는 수만 줄, 많게는 수십만 줄의 코드가 돌아가고 있는 거대한 시스템이라면 어떨까? `git blame`을 사용했을 때 모든 소스코드에 내 이름이 나오게 하고 싶은 게 아니라면 내가 수정한 파일만 골라서 정적 분석 툴을 돌릴 수 있는 기능이 절실해진다. 이럴 때 사용할 수 있는 툴이 `lint-staged`이다.

```sh
npm i -D lint-staged
```

이번에도 마찬가지로 `package.json`에 설정을 작성한다. rc 파일을 생성하는 것도 가능한데, json, yaml 포맷을 지원한다. 이 때, **스크립트에 있는 경로 지정자를 다 빼 버려야 알아서 변경된 파일만 추적하게 만들 수 있다.** 기존 prettier와 eslint는 경로를 지정해 주었는데 아래 스크립트에서는 경로가 빠진 것에 주목하자.

```json
{
	"husky": {
		"hooks": {
			"pre-commit": "lint-staged"
		}
	},
	"lint-staged": {
		"**/*.{js,jsx,ts,tsx}": [
			"prettier --write",
			"eslint"
		],
		"**/*.json": "prettier --write"
	}
}
```

![eslint 오류로 커밋이 멈추었다](./assets/block-commit.png)

이제 모든 코드는 커밋 시 자동으로 포매팅되며, 잘못된 코드는 커밋조차 불가능하다.

## 정리

이전 글에서도 말했지만 사람은 누구나 실수를 한다. 나는 그 실수를 어떻게 대하는지가 성장으로 가는 발판이라고 본다. 시작은 실수투성이 코드였지만 정적 분석과 자동화라는 두 가지 무기를 가지고 우리는 일관적이고 잘 정리된 코드를 얻을 수 있게 되었다. 혹자는 간단하고 귀찮은 일은 모조리 자동화시키고 사람은 생산적이고 창의적인 일에 시간을 쏟는 것이 생산성 향상의 지름길이라고 한다. 정적 분석 같은 귀찮은 일은 컴퓨터에 맡겨버리고 우리는 좀 더 아름다운 아키텍처에 관심을 쏟아보도록 하자.
