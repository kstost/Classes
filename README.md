사용은 아래와 같이.

:)

```javascript
Classes.define(['동물'], function (obj) {
    this.생년월일 = obj.생년월일;
    this.체중 = obj.체중;
    this.생존 = true;
}, {
    동물상수: 35323,
    체중얻기: function () {
        return this.체중;
    },
    죽이기: function () {
        this.생존 = false;
        console.log('죽음');
    }
}
);
Classes.define(['동물', '사람'], function (obj) {
    this.국적 = obj.국적;
    this.최종학력 = obj.최종학력;
}, {
    국적얻기: function () {
        return this.국적;
    }
}
);
Classes.define(['동물', '사람', '개발자'], function (obj) {
    this.사용언어 = obj.사용언어;
    this.경력년수 = obj.경력년수;
}, {
    경력년수얻기() {
        return this.경력년수;
    }
}
);
let 개발자 = new Classes.동물.사람.개발자({
    생년월일: '2008-06-11',
    체중: '77kg',
    국적: '대한민국',
    최종학력: '중졸',
    사용언어: ['javascript', 'python', 'java'],
    경력년수: 7
});
console.log(개발자.동물상수);
console.log(개발자.체중얻기());
console.log(개발자.국적얻기());
console.log(개발자.경력년수얻기());
console.log(개발자.생존);
개발자.죽이기();
console.log(개발자.생존);
```
