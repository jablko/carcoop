#!/usr/bin/env python

import httplib, re, urlparse
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

def escape(value):
  return value.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def unescape(value):
  return value.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')

# Create HTTP connection from URL scheme, host, and port
def http_connection(url):
  components = list(urlparse.urlparse(url))

  if 'https' == components[0]:
    return httplib.HTTPSConnection(components[1])

  return httplib.HTTPConnection(components[1])

def slugify(value):
  value = value.lower()

  value = re.sub('[^0-9a-z]+', '-', value)

  value = '-%s-' % value
  value = value.replace('-a-', '-')
  value = value.replace('-an-', '-')
  value = value.replace('-the-', '-')

  value = value.strip('-')

  return value

class Page(webapp.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'application/json'

    self.response.out.write('false')

class MainPage(webapp.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'application/vnd.google-earth.kml+xml'

    method = 'GET'
    url = 'http://www.cooperativeauto.net/resources/scripts/vehicle_finder'

    url = self.request.get('url', url)
    url = urlparse.urljoin(self.request.url, url)

    conn = http_connection(url)

    conn.request(method, url)
    response = conn.getresponse()

    data = response.read()
    data = re.sub('<br />', ' ', data)

    placemark = []

    # Avoid matching "map.setCenter(new GLatLng(..."
    for match in re.finditer('var point = new GLatLng\((.*?), (.*?)\).*?createMarker\(.*?"(.*?)", "(.*?)"', data, re.S):
      placemark.append("""<Placemark id="%s">

  <name>%s</name>

  <description>%s</description>

  <Point>
    <coordinates>%s,%s</coordinates>
  </Point>

</Placemark>
""" % (slugify(unescape(match.group(3))),
        match.group(3),
        match.group(4),
        match.group(2),
        match.group(1)))

    self.response.out.write("""<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    %s
  </Document>
</kml>
""" % ''.join(placemark))

if __name__ == '__main__':
  run_wsgi_app(webapp.WSGIApplication([('/index', Page),
    ('/index.kml', MainPage)]))
