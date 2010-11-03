jQuery.ajax({

  data: { url: 'test/googleMap.html' },
  url: '../latlng',

  success: function (data)
    {
      jQuery(function ($)
        {
          if ([[49.277339, -123.134425],
              [49.208652, -122.919473],
              [49.267853, -123.071342]] === data)
          {
            $('<div class="pass">PASS</div>').appendTo('body');
          }
          else
          {
            $('<div class="fail">FAIL</div>').appendTo('body');
          }
        });
    } });
