test('', function ()
  {
    stop();

    jQuery.ajax({

      data: { url: 'test/googleMap.html' },
      url: '../latlng',

      success: function (data)
        {
          same(data, [[49.277339, -123.134425],
              [49.208652, -122.919473],
              [49.267853, -123.071342]]);

          start();
        } });
  });
