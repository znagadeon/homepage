---
title: jest와 mock-fs로 fs 유닛 테스트하기
category: dev
tags:
    - js
    - node
    - fs
    - jest
    - mock-fs
layout: post
published: 2020-02-01T18:16:00+09:00
---

파일시스템 유닛 테스트는 까다롭다. DB/API 테스트와 마찬가지로, 원래라면 건드리면 안 되는 외부 시스템에 영향을 주기 때문이다. 보통 DB 테스트는 자신의 로컬 머신을 이용하든지, 테스트 전용 서버를 따로 파든지 해서 이 문제를 회피한다. 이 흐름을 파일시스템 테스트에 그대로 적용하면 테스트용 디렉토리를 따로 파야 한다는 이야기가 된다. 못 할 건 아니지만 좀 지저분하고 번거롭다.

그래서 보통 파일시스템 메서드를 모킹해서 테스트를 진행한다. node.js에서는 [mock-fs](https://github.com/tschaub/mock-fs)라는 라이브러리와 jest의 mock function을 이용하면 된다.

사용법은 간단한 편이다. 일단 jest와 mock-fs를 설치하자.

```sh
# 작성 시점 기준으로 jest@^25.1.0, mock-fs@^4.10.4 이 설치됨
npm i -D jest mock-fs
```

# `fs.readFile` 테스트

mock-fs는 `mock`이라는 함수로 일종의 가상 파일시스템을 만들어 준다.

```js
const fs = require('fs');
const mock = require('mock-fs');

describe('sample test', () => {
    it('mock-fs test', () => {
        mock({
            fake: {
                dir: {
                    'file.txt': 'content',
                },
            },
            'file2.txt': '', // 빈 파일 생성
            empty: {}, // 빈 디렉토리 생성
            'path/to/file.txt': '', // full path를 써줄 수도 있다
        });

        fs.readFile('./file2.txt', (err, str) => { // relative path 사용
            // ...
        });
    });

    afterEach(() => {
        mock.restore();
    });
});
```

주의할 점은, 테스트를 종료하기 전에 반드시 `mock.restore()`를 실행해 주어야 한다는 점이다. 내가 테스트에 사용할 때는 없어도 딱히 문제는 없었으나, 공식 문서에 따르면 몇몇 상황에서 문제가 일어나는 경우가 있다고 한다. 내가 그 케이스일 수 있으니 꼬박꼬박 종료해주자.

## `withFileTypes` 문제

node 10.10.0 버전부터 `fs.readdir`에 옵션으로 `withFileTypes`를 줄 수 있게 되었다.

```
└─dir1
   ├─file1
   └─dir1
      └─file2
```

이런 파일 구조가 있다고 할 때,

```js
console.log(
    fs.readdirSync('./dir1', { withFileTypes: true })
        .map(dirent => dirent.isFile())
); // > [false, true] (파일명에 따라 순서는 바뀔 수 있음)
```

이런 식으로, 디렉토리 안에 있는 오브젝트가 파일인지, 디렉토리인지 등등을 쉽게 알 수 있어 편리하다.

다만 아직 `mock-fs`가 이 기능을 지원하지 않아, 테스트 작성 시 테스트가 깨지는 문제가 있다.

[해당 문제를 해결한 커밋](https://github.com/tschaub/mock-fs/commit/ec9b2671884378e9a53554499891ca5c3f50b9a6)이 마스터 브랜치에 머지된 것으로 보아, 아마 다음 버전쯤엔 해결되지 않을까 싶다. 일단 나는 해당 옵션을 사용하는 테스트는 테스트를 스킵하도록 처리해두었다.

# `fs.writeFile` 테스트

`mock-fs`로는 파일 쓰기 테스트를 할 수 없다. 필요한 쓰기 함수를 jest로 모킹하여 해당 문제를 해결할 수 있다.

```js
describe('sample test', () => {
    fs.writeFileSync = jest.fn();
    const write = jest.spyOn(fs, 'writeFileSync');

    fs.mkdirSync = jest.fn();
    const mkdir = jest.spyOn(fs, 'mkdirSync');

    it('write test', () => {
        fs.writeFileSync('./test.txt', 'content');
        expect(write).toHaveBeenCalledWith('./test.txt', 'content');
    });

    it('mkdir test', () => {
        fs.mkdirSync('dir');
        expect(mkdir).toHaveBeenCalledWith('dir');
    });
});
```
