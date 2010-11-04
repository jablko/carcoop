test('', function ()
  {
    stop();

    jQuery.ajax({

      data: { url: 'test/googleMap.html' },
      url: '../latlng',

      success: function (data)
        {
          equal($('coordinates', data).text(), '-123.134425,49.277339-122.919473,49.208652-123.071342,49.267853');

          start();
        } });
  });
