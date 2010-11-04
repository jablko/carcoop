#!/usr/bin/env python

import cgi, httplib, json, re, sys, urlparse

# Create HTTP connection from URL scheme, host, and port
def http_connection(url):
  components = list(urlparse.urlparse(url))

  if 'https' == components[0]:
    return httplib.HTTPSConnection(components[1])

  return httplib.HTTPConnection(components[1])

print 'Content-Type: application/json'
print

method = 'GET'
url = 'http://www.cooperativeauto.net/locations/googleMap'

try:
  url = cgi.parse()['url'][0]

except KeyError:
  pass

conn = http_connection(url)

conn.request(method, url)
response = conn.getresponse()

obj = []
for match in re.finditer('GLatLng\((.+?), (.+?)\)', response.read()):
  obj.append([match.group(1), match.group(2)])

json.dump(obj, sys.stdout)
