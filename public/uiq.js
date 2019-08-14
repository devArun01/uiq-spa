(function () {
  var useriq = window._uiq = window._uiq || [];
  useriq.invoked && window.console && console.error && console.error("Useriq snippet already exists."),
    useriq.invoked = !0,
    useriq.methods = ["setSiteId", "startTracker", "setDoNotTrack", "identify", "track", "group"],
    useriq.factory = function (e) {
      return function () {
        var r = Array.prototype.slice.call(arguments);
        return r.unshift(e),
          useriq.push(r),
          useriq
      }
    }
    ;
  for (var i = 0; i < useriq.methods.length; i++) {
    var key = useriq.methods[i];
    useriq[key] = useriq.factory(key)
  }
  // We have dynamically assigned your useriq_site_id
  //   var useriq_site_id = "501040701"//for qa testing
  var useriq_site_id = "1" //for production testing
  //You will be provided with a SiteID once you register for a trial
  //All green highlights indicate the areas in the UserIQ script that should contain your own variables
  // user id is required
  var user_id = 1234
  // account id is required for account analytics
  var account_id = 4321
  useriq.setSiteId(useriq_site_id)
  useriq.identify(user_id, {
    user_name: `karana_${Date.now()}`,
    account_id: '321',
    account_name: `accName_${Date.now()}`,
    user_email: `narak1.@useriqdummyy.com`,
    signup_date: '24-04-2019',
  })
  useriq.startTracker()
  var d = document
    , g = d.createElement("script")
    , s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.defer = true;
  g.async = true;
  //  g.src = "https://feed.useriq.com/useriq-qa.js";//for qa testing
  g.src = "https://testingtheboss.webhostapp.com/test/useriq.js";//for production testing
  s.parentNode.insertBefore(g, s);
}
)();
