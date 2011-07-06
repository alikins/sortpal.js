#!/usr/bin/python

# from http://code.activestate.com/recipes/266466-html-colors-tofrom-rgb-tuples/
import sys

def HTMLColorToRGB(colorstring):
    """ convert #RRGGBB to an (R, G, B) tuple """
    colorstring = colorstring.strip()
    if colorstring[0] == '#': colorstring = colorstring[1:]
    if len(colorstring) != 6:
        raise ValueError, "input #%s is not in #RRGGBB format" % colorstring
    r, g, b = colorstring[:2], colorstring[2:4], colorstring[4:]
    r, g, b = [int(n, 16) for n in (r, g, b)]
    return (r, g, b)



print "GIMP Palette"
print "Name: XKCD"
print "Columns: 16"
print "#"
for i in sys.stdin:
	parts = i.split('#')
	r,g,b = HTMLColorToRGB(parts[1])
	print "%s %s %s\t%s" % (r,g,b,parts[0])









