var loaded;

jQuery(function ($)
  {
    var $div = $('<div id="loading">Loading...</div>').appendTo('body');

    (function loading()
      {
        $div.text($div.text() + '.');

        setTimeout(loading, 1000);
      })();

   loaded = function()
   {
     $div.remove();
   }
  });

jQuery.ajax({

  url: 'index',

  success: function (data)
    {
      jQuery(function ($)
        {
          function resolve(relative, base)
          {
            if (undefined === base)
            {
              base = location;
            }

            return base.protocol + '//' + base.host + base.pathname.replace(/[^/]*$/, '') + relative;
          }

          if (data)
          {
            $('<input type="submit" value="I\'m done with this car"/>').appendTo('#page');
          }
          else
          {
            var map = new google.maps.Map($('#page')[0], {
              mapTypeId: google.maps.MapTypeId.ROADMAP });

            // http://code.google.com/p/gmaps-api-issues/issues/detail?id=2825
            var kmlLayer = new google.maps.KmlLayer(resolve('index.kml'), { map: map });

            if (navigator.geolocation)
            {
              navigator.geolocation.getCurrentPosition(function (position)
                {
                  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                  map.setZoom(14);

                  kmlLayer.preserveViewport = true;
                });
            }
            else if (google.gears)
            {
              google.gears.factory.create('beta.geolocation').getCurrentPosition(function (position)
                {
                  map.setCenter(new google.maps.LatLng(position.latitude, position.longitude));
                  map.setZoom(14);

                  kmlLayer.preserveViewport = true;
                });
            }

            loaded();
          }
        });
    } });
