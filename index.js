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
                  jQuery.each(data, function ()
                    {
                      new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(this[0], this[1]) });
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
