


function unique(a)
{
	var r = new Array();
	o:for(var i = 0, n = a.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if((r[x][0]==a[i][0]) && (r[x][1]==a[i][1]) && (r[x][2]==a[i][2])) {
//				console.log("dupe" + r[x][0] + " " + a[x][0] + " " + r[x][1] + " " + a[x][1]);
				continue o;
			} 
		}
	r[r.length] = a[i];
	}
	return r;
}


function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function distFrom0(x,y,z){
	return Math.sqrt( (Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2) ) );
	}


//http://www.fourcc.org/fccyvrgb.php 
function rgb_to_yuv(rgb) {
 //   Ey = 0.299R + 0.587G + 0.114B
 //  U = Ecr = 0.713(R - Ey) = 0.500R - 0.419G - 0.081B
 //  V = Ecb = 0.564(B - Er) = -0.169R - 0.331G + 0.500B (Gregory Smith points out that Er here should read Ey - equations above were corrected)
    var r = rgb[0]/255;
    var g = rgb[1]/255;
    var b = rgb[2]/255;
    y = (0.299 * r)  + (0.587 * g) + (0.114 * b);
    u = (.5 * r) - (0.419 * g) - (0.081 * b);
    v = (-0.169 * r)  - (0.331 * g) + (0.5 * b);

    // This method is wrong
    
    return [y ,u,v];
}


function rgb_to_xyz(rgb) {
	red = rgb[0];
	green = rgb[1];
	blue = rgb[2];

	x = ((0.412453 * red) + (0.357580 * green) + (0.180423 * blue));
	y = ((0.212671 * red) + (0.715160 * green) + (0.072169 * blue));
	z = ((0.019334 * red) + (0.119193 * green) + (0.950227 * blue));

	xyz = [x,y,z];
	return xyz;
}


function rgb_to_hwb(rgb) {
	var min = Math.min(rgb[0], rgb[1], rgb[2]);
	var max = Math.max(rgb[0], rgb[1], rgb[2]);
    var v = max;
    var w = min;
	b = 255 -v;

	// dont really need hue here, just stub it and return w/b
	color = [0,w,b];
	return color;
	
}

// from http://www.kourbatov.com/faq/rgb2cmyk.htm
function rgb_to_cmyk (rgb) {
	computedC = 0;
	computedM = 0;
	computedY = 0;
	computedK = 0;

	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];

	// BLACK
	if (r==0 && g==0 && b==0) {
		computedK = 1;
		return [0,0,0,1];
	}

	computedC = 1 - (r/255);
	computedM = 1 - (g/255);
	computedY = 1 - (b/255);

	var minCMY = Math.min(computedC, Math.min(computedM, computedY));

	computedC = (computedC - minCMY) / (1 - minCMY) ;
	computedM = (computedM - minCMY) / (1 - minCMY) ;
	computedY = (computedY - minCMY) / (1 - minCMY) ;
	computedK = minCMY;

	return [computedC, computedM, computedY, computedK];
}

// from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
function rgb_to_hsl(rgb){
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[1];
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

// from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
function rgb_to_hsvc(rgb){
	 var r = rgb[0];
	 var g = rgb[1];
	 var b = rgb[2];
	 
    r = r/255;
    g = g/255;
    b = b/255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = max;
    var s = max;
    var v = max;

    var c = max - min;
    s = max === 0 ? 0 : c / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / c + (g < b ? 6 : 0); break;
            case g: h = (b - r) / c + 2; break;
            case b: h = (r - g) / c + 4; break;
        }
        h /= 6;
    }

    return [h, s, v, c];
}



function genColorsRandom() {
	var colors = [];

	for (var i=0;i <255; i++) {
		color = [Math.ceil(Math.random()*255), Math.ceil(Math.random()*255), Math.ceil(Math.random()*255)];
		colors[i] = color;
		}
	return colors;
}

function genColors() {
	var colors = [];
	
	count = 0;
	for (var i=0; i < 256; i=i+24) {
		for (var j=0;j < 256; j=j+24) {
			for (var k=0; k< 256; k=k+24) {
				color = [i, j, k];	
				colors[count] = color;
				count++;
				}
			}
		}
	return colors;
}


function Color(rgb) {
    this.red = parseFloat(rgb[0]);
    this.green = parseFloat(rgb[1]);
    this.blue = parseFloat(rgb[2]);	
    // precompute these
    this.purple = (this.red * this.blue);
    this.blueGreen = (this.blue * this.green);
    this.brown = (this.red * this.green);

    this.total = (this.red + this.green + this.blue);

    this.rgb3d = distFrom0(this.red, this.green, this.blue);

    hsvc = rgb_to_hsvc(rgb);
    hsl = rgb_to_hsl(rgb);
    hwb = rgb_to_hwb(rgb);
    xyz = rgb_to_xyz(rgb);
    cmyk = rgb_to_cmyk(rgb);
    yuv = rgb_to_yuv(rgb);
    this.hue = hsvc[0];
    this.sat = hsvc[1];
    this.value = hsvc[2];

    this.hsv3d = distFrom0(this.hue, this.sat, this.value);

    this.chroma = hsvc[3];

    this.whiteness = hwb[1];
    this.blackness = hwb[2];

    this.lightness = hsl[2];
    this.hsl3d = distFrom0(this.hue, this.sat, this.lightness);

    this.cr = yuv[0];
    this.u = yuv[1];
    this.vv = yuv[2];

    this.x = xyz[0];
    this.y = xyz[1];
    this.z = xyz[2];

    this.cyan = cmyk[0];
    this.magenta = cmyk[1];
    this.yellow = cmyk[2];
    //econsole.log(this.blackness, this.z, this.lightness);

}

Color.prototype = {
    decimalToHex: function(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }
        return hex;
    },
    hexrgb: function() {
      return "#" + this.decimalToHex(this.red,2) + this.decimalToHex(this.green,2) + this.decimalToHex(this.blue,2);
    }
};


function Sorter(sort) {
    var sortvalue = sort;
	// secondary and tertiary sorts to try to stabilize the sort
    var secsortvalue = 'hsv3d';
    var tertsortvalue = 'chroma';
    this.cmp = function(a,b) {
        var pri = (a[sortvalue] - b[sortvalue]);
        if (pri === 0) {
            var sec = (a[secsortvalue] - b[secsortvalue]);
            if (sec === 0) {
                return (a[tertsortvalue] - b[tertsortvalue]);
            }
            return sec;
        }
        return pri;
    }
}




function preComputeColors(colors) {
	var colorspaces = [];
	for (color in colors) {
	  colorspaces[color] = new Color(colors[color]);
	}
		
	return colorspaces;
}



function ColorSorter(colors) {

    var colors = colors;
    var colorList = [];

    // sort by a specific attribute
    this.attrSort = function(sort) {
        var sorter = new Sorter(sort);
        var sortedColors = colors.slice(0);
        sortedColors.sort(sorter.cmp);
        return sortedColors;
    }

    colorList.red = this.attrSort('red');
    colorList.blue = this.attrSort('blue');
    colorList.green = this.attrSort('green');
	

    colorList.purple = this.attrSort('purple');
    colorList.blueGreen = this.attrSort('blueGreen');
    colorList.brown = this.attrSort('brown');

    colorList.total = this.attrSort('total');

    colorList.value = this.attrSort('value');
    colorList.sat = this.attrSort('sat');
    colorList.hue = this.attrSort('hue');

    colorList.whiteness = this.attrSort('whiteness');
    colorList.blackness = this.attrSort('blackness');

    colorList.cr = this.attrSort('cr');
    colorList.u = this.attrSort('u');
    colorList.vv = this.attrSort('vv');

    colorList.chroma = this.attrSort('chroma');
    colorList.lightness = this.attrSort('lightness');

    colorList.x = this.attrSort('x');
    colorList.y = this.attrSort('y');
    colorList.z = this.attrSort('z');

    colorList.cyan = this.attrSort('cyan');
    colorList.magenta = this.attrSort('magenta');
    colorList.yellow = this.attrSort('yellow');

    colorList.rgb3d = this.attrSort('rgb3d');
    colorList.hsv3d = this.attrSort('hsv3d');
    colorList.hsl3d = this.attrSort('hsl3d');

	//console.log(colorList.yellow);
    this.getColors = function() {
        return colorList;
    }


}



function drawColorList(colorlist){
    var t = document.getElementById('palette_table');
	
	// replace the rows in the table on redraw
	while(t.hasChildNodes())
	{
		t.removeChild(t.firstChild);
	}

	
//	cl = [colorlist.yellow];
    for (l in colorlist) {

       row = t.insertRow(0);
       var label = row.insertCell(0);
       label.innerHTML = l;
       var canvasCell = row.insertCell(0);
       canvasCell.appendChild(drawPalette(colorlist[l]));

       var label2 = row.insertCell(0);
       label2.innerHTML = l;
    }


}

function drawPalette(palette) {
    var canvas = document.createElement('canvas');
    canvas.id = l;


    var w_w = window.innerWidth;	
    var w = document.width;
    var h = document.height;
    var t = document.getElementById('palette_table');

    // using document.width doesn't work because it changes as the
    // page renders. using width of the row element doesn't seem
    // much better
    //console.log(w_h)
	//console.log(palette.length);

    // the 160 is just a guessed fudge factor so we take into about
    // most of the size of the text, approximately. 
    var needed_w = ((w_w-160)/palette.length);
    var height = 20;
    var width = 1;
    if (width < needed_w) { width = needed_w;}
   // var width = needed_w;

    canvas.height = height;
    canvas.width = (width*(palette.length));

    var ctx = canvas.getContext("2d");

    //console.log(width);
    ctx.lineWidth = width;
    var count = 0;
    // we start drawing at half the width of the line, so the line's left side is at 0
    var start_x = width/2;

    // should probably fix the cmp's instead
    palette.reverse();
    for (i in palette){
		//console.log(palette[i].yellow);
        ctx.strokeStyle = palette[i].hexrgb();
        ctx.beginPath();
        ctx.moveTo(start_x+(count*width),0);
        ctx.lineTo(start_x+(count*width),height);
        ctx.stroke();
        count++;
    }
    return canvas;
}

function updateTable(palette){
  var rgbColors = getColors(palette);
  var colors = preComputeColors(rgbColors);
  var color_sorter = new ColorSorter(colors);
  var color_list = color_sorter.getColors();

  drawColorList(color_list);

} 
      
function writeTableRow(name, table, colors) {
	var row = table.insertRow(0);
	var label = row.insertCell(0);
	label.innerHTML = name;
	for (i in colors ) {
		var cell = row.insertCell(0);
		cell.bgColor = colors[i].hexrgb();
		cell.innerHTML = "&nbsp;";			
	}
	var cell = row.insertCell(0);
	cell.innerHTML = name;
}      

function genGrays() {
    list = []
    for (var i = 0; i <256; i++){
        list[i] = ([i,i,i]);
    }
    return list;
}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}


function getPalettes() {
	var xhttp = new XMLHttpRequest();
	var filename = "palettes/palettes.txt";
    xhttp.open("GET",filename,false);
    xhttp.send("");
    var paletteDoc=xhttp.responseText;

	var palette_list = [];
	var palette_lines = paletteDoc.split('\n');
	for(palette_line in palette_lines) {
		palette_list.push(palette_lines[palette_line]);
	}
	return palette_list;
}

function uniq(src) {
	var dest = [];
	var buf = src[0];
	for(var i=1; i<=src.length; buf=src[i++]) {
		if(!src[i] || buf != src[i])
			dest.push(buf);
	}
	return dest;	
}

function parseGpl(gpl){

    gpl_colors = [];
    var lines  = gpl.split('\n');
    //console.log(lines[0]);
    lines = lines.splice(3);
    for (line in lines) {
         line_buf = trim(lines[line]);

        regex =  /(\d+)\D*?(\d+)\D*?(\d+).*/g ;
        var reg = line_buf.match(regex);
        var results = regex.exec();

        if (results) {
            r = results[1];
            g = results[2];
            b = results[3];
            var color_a = [r,g,b];
            gpl_colors.push(color_a);
        }
    }
	
	//console.log(gpl_colors.length);
	var gc = unique(gpl_colors);
	//console.log(gc.length);
	//gpl_colors.uniq();
	
    return gc;
}

function getColors(palette){

    var xhttp = new XMLHttpRequest();
	var filename = "palettes/"+palette+".gpl";
	//console.log(filename);
    xhttp.open("GET",filename,false);
    xhttp.send("");
    var gplDoc=xhttp.responseText;

   // console.log(gplDoc);
    var gpl_c = parseGpl(gplDoc) ;
    //console.log(gpl_c);
	color_lists = new Array();
    color_lists[palette] = gpl_c;
    color_lists['grays'] = genGrays();



	return color_lists[palette];

}   
 
 

