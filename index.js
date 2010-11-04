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
            $('<input type="submit" value="I\'m done with this car"/>').appendTo('body');
          }
          else
          {
            var map = new google.maps.Map($('<div/>').appendTo('body')[0], {
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              zoom: 12 });

            // http://code.google.com/p/gmaps-api-issues/issues/detail?id=2825
            var kmlLayer = new google.maps.KmlLayer(resolve('latlng'), { map: map });

            if (navigator.geolocation)
            {
              navigator.geolocation.getCurrentPosition(function (position)
                {
                  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

                  kmlLayer.preserveViewport = true;
                });
            }
            else if (google.gears)
            {
              google.gears.factory.create('beta.geolocation').getCurrentPosition(function (position)
                {
                  map.setCenter(new google.maps.LatLng(position.latitude, position.longitude));

                  kmlLayer.preserveViewport = true;
                });
            }
          }
        });
    } });
