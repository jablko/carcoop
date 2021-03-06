function resolve(relative, base)
{
  if (undefined === base)
  {
    base = location;
  }

  return base.protocol + '//' + base.host + base.pathname.replace(/[^/]*$/, '') + relative;
}

test('resolve()', function ()
  {
    equal(resolve('g', { protocol: 'http:',
        host: 'a',
        pathname: '/b/c/d;p',
        search: '?q' }),
      'http://a/b/c/g');
  });

test('index.kml', function ()
  {
    stop();

    jQuery.ajax({

      data: { url: 'test/googleMap.html' },
      url: '../index.kml',

      success: function (data)
        {
          ok($('#beach', data).length, '#beach');
          ok($('#nw-ash-fouth-avenue', data).length, '#nw-ash-fourth-avenue');
          ok($('#paloma', data).length, '#paloma');

          equal($('name', data).text(),
            'BeachNW - Ash & Fourth AvenuePaloma');

          equal($('description', data).text(),
            'Vancouver - Beach Avenue & Thurlow StreetNew Westminster - Ash Street & Fourth AvenueVancouver - East 3rd Avenue & Cotton Drive');

          equal($('coordinates', data).text(),
            '-123.134425,49.277339-122.919473,49.208652-123.071342,49.267853');

          start();
        } });
  });
