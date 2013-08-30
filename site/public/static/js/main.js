(function() {
  var shroud = document.getElementById('shroud');
  var shroudable = {
    '/projects': '#FFB538',
    '/blog/': '#51A9FF'
  };

  var transform = function(el, v) {
    var s = el.style;
    s.WebkitTransform =
    s.MozTransform =
    s.msTransform =
    s.OTransform =
    s.transform = v;
  };

  vz.touch(document.querySelectorAll('a'), {click: function(e) {
    var href = e.target.getAttribute('href');

    if (shroud && shroudable.hasOwnProperty(href)) {
      shroud.style.transition = 'none';
      shroud.offsetLeft;
      shroud.style.opacity = 1;
      transform(shroud, 'translateX(100%)');
      shroud.style.backgroundColor = shroudable[href];
      shroud.style.display = 'block';
      shroud.style.transition = 'all 0.3s ease';
      shroud.offsetLeft;
      transform(shroud, '');

      setTimeout(function() {
        window.location = href;
      }, 200);
    } else {
      window.location = href;
    }
  }});
})();
