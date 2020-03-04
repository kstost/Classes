// okk
let Classes = {
   SEPERATOR: '.',
   extract: function (domain) {
      let dset = {};
      if (domain.indexOf(this.SEPERATOR) == -1) {
         dset.parent_constructor = null;
         dset.constructor_name = domain;
      } else {
         let spl = domain.split(this.SEPERATOR);
         dset.constructor_name = spl.splice(spl.length - 1, 1)[0];
         dset.parent_constructor = spl.join(this.SEPERATOR);
      }
      return dset;
   },
   assigning: function (domain, constructor) {
      let container = this;
      let dset = this.extract(domain);
      dset.constructor = constructor;
      dset.constructor.prototype.constructor = dset.constructor;
      if (dset.parent_constructor) {
         container[dset.parent_constructor + this.SEPERATOR + dset.constructor_name] = dset.constructor;
         container[dset.parent_constructor][dset.constructor_name] = dset.constructor;  // 실험..
         dset.constructor.prototype = Object.create(container[dset.parent_constructor].prototype);
      } else {
         container[dset.constructor_name] = dset.constructor;
      }
   },
   proton: function (domain, val) {
      let dset = this.extract(domain);
      this[dset.parent_constructor].prototype[dset.constructor_name] = val;
   },
   define: function (domain, constructor, prototypes) {
      if (typeof domain !== 'string') {
         domain = domain.join(this.SEPERATOR);
      }
      let dset = this.extract(domain);
      let pointer = this;
      pointer.assigning(domain, function (obj) {
         if (dset.parent_constructor) {
            pointer[dset.parent_constructor].call(this, obj);
         }
         constructor.call(this, obj);
      });
      if (prototypes) {
         for (let key in prototypes) {
            pointer.proton(domain + this.SEPERATOR + key, prototypes[key]);
         }
      }
   }
};
if (false) {
   //==============================================
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
}
try {
   if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = Classes;
   }
} catch (e) { }