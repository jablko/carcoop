jQuery.ajax({

  url: 'index',

  success: function (data)
    {
      jQuery(function ($)
        {
          if (data)
          {
            $('<input type="submit" value="I\'m done with this car"/>').appendTo('body');
          }
          else
          {
            var map = new google.maps.Map($('<div/>').appendTo('body')[0], {
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              zoom: 8 });

            jQuery.ajax({

              url: 'latlng',

              success: function (data)
                {
                  $('coordinates', data).each(function ()
                    {
                      var splits = $(this).text().split(',');

                      new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(splits[1], splits[0]) });
                    });
                } });

            if (navigator.geolocation)
            {
              navigator.geolocation.getCurrentPosition(function (position)
                {
                  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                });
            }
            else if (google.gears)
            {
              google.gears.factory.create('beta.geolocation').getCurrentPosition(function (position)
                {
                  map.setCenter(new google.maps.LatLng(position.latitude, position.longitude));
                });
            }
          }
        });
    } });
