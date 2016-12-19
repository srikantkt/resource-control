'use strict';

var policy = {
  "Accounts": {
    "$ctx.jobctx.userId": {
      "resourceId": "$ctx.jobctx.userId",
      "actions": ['read', 'update']
    }
  }
}

var context = {
  jobctx: {
    userId: "joe",
    tenantId: "acme"
  },
  systemCtx: {
    serviceInstanceId: "acme-mktg"
  }
}

var matcher = function(obj, context) {
  let $ctx = context;
  console.log(policy); 
  console.log('======'); 
  console.log(policy.Accounts); 
  console.log('======'); 
  console.log(Object.keys(policy.Accounts)); 
  Object.keys(policy.Accounts).forEach(function(el) {
      console.log(el);
      let x = obj + " == " + el;
      console.log(eval(x));
    }
  );
}

let x = matcher('joe', context);
