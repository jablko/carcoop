#!/usr/bin/env python

import httplib, json, re, urlparse
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

# Create HTTP connection from URL scheme, host, and port
def http_connection(url):
  components = list(urlparse.urlparse(url))

  if 'https' == components[0]:
    return httplib.HTTPSConnection(components[1])

  return httplib.HTTPConnection(components[1])

class MainPage(webapp.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'application/json'

    method = 'GET'
    url = 'http://www.cooperativeauto.net/locations/googleMap'

    url = self.request.get('url', url)
    url = urlparse.urljoin(self.request.url, url)

    conn = http_connection(url)

    conn.request(method, url)
    response = conn.getresponse()

    obj = []
    for match in re.finditer('GLatLng\((.+?), (.+?)\)', response.read()):
      obj.append([match.group(1), match.group(2)])

    json.dump(obj, self.response.out)

if __name__ == '__main__':
  run_wsgi_app(webapp.WSGIApplication([('/latlng', MainPage)]))
