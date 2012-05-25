// https://gist.github.com/1653547

/* jQuery XXS Pub/Sub
 * @tdecs
 * Dual licensed under the MIT and GPL licenses */

(function($, o) {

  o = $({});

  $.subscribe = function(e, h) {
    o.on.call(o, e, h);
  };

  $.unsubscribe = function(e, h) {
    o.off.call(o, e, h);
  };

  $.publish = function(e, h) {
    o.trigger.call(o, e, h);
  };

}(jQuery));
