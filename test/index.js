function resolve(relative, base)
{
  if (undefined === base)
  {
    base = location;
  }

  return base.protocol + '//' + base.host + base.pathname.replace(/[^/]*$/, '') + relative;
}

test('', function ()
  {
    equal(resolve('g', { protocol: 'http:',
        host: 'a',
        pathname: '/b/c/d;p',
        search: '?q' }),
      'http://a/b/c/g');
  });

test('', function ()
  {
    stop();

    jQuery.ajax({

      data: { url: 'test/googleMap.html' },
      url: '../latlng',

      success: function (data)
        {
          equal($('name', data).text(),
            'BeachNW - Ash & Fourth AvenuePaloma');
          equal($('description', data).text(),
            'Vancouver - Beach Avenue & Thurlow StreetNew Westminster - Ash Street & Fourth AvenueVancouver - East 3rd Avenue & Cotton Drive');
          equal($('coordinates', data).text(),
            '-123.134425,49.277339-122.919473,49.208652-123.071342,49.267853');

          start();
        } });
  });
