#!/usr/bin/python

import simplejson as json
import sys

filename = sys.argv[1]
f = open(filename)

colors = []
lines = f.readlines()
lines = lines[3:]
for color in lines:
	if color[0] == "#":
		continue
	bits = color.split()
	r = int(bits[0])
	g = int(bits[1])
	b = int(bits[2])
	colors.append([r,g,b])

print json.dumps(colors)

