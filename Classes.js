var Classes = {
   SEPERATOR: '.',
   extract: function (domain) {
      var dset = {};
      if (domain.indexOf(this.SEPERATOR) == -1) {
         dset.parent_constructor = null;
         dset.constructor_name = domain;
      } else {
         var spl = domain.split(this.SEPERATOR);
         dset.constructor_name = spl.splice(spl.length - 1, 1)[0];
         dset.parent_constructor = spl.join(this.SEPERATOR);
      }
      return dset;
   },
   assigning: function (domain, constructor) {
      var container = this;
      var dset = this.extract(domain);
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
      var dset = this.extract(domain);
      this[dset.parent_constructor].prototype[dset.constructor_name] = val;
   },
   define: function (domain, constructor, prototypes) {
      var dset = this.extract(domain);
      var pointer = this;
      pointer.assigning(domain, function (obj) {
         if (dset.parent_constructor) {
            pointer[dset.parent_constructor].call(this, obj);
         }
         constructor(this, obj);
      });
      if (prototypes) {
         for (var key in prototypes) {
            pointer.proton(domain + this.SEPERATOR + key, prototypes[key]);
         }
      }
   }
};
