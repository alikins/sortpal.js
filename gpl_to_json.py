#!/usr/bin/python

import simplejson as json
import sys

filename = sys.argv[1]
f = open(filename)

lines = f.readlines()
# gpl files have a small simple header for the first 3 lines
lines = lines[3:]

color_dict = {}
for color in lines:
	# this is a comment to tell you that # indicates a comment
	if color[0] == "#":
		continue
	bits = color.split()
	r = int(bits[0])
	g = int(bits[1])
	b = int(bits[2])
	# uniq...
	color_dict[(r,g,b)] = [r,g,b]

print json.dumps(color_dict.values())
