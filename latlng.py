#!/usr/bin/env python

import json, sys

print 'Content-Type: application/json'
print

json.dump([[49.277339, -123.134425],
  [49.208652, -122.919473],
  [49.267853, -123.071342]], sys.stdout)
