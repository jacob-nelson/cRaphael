var barGraph = function(holder, w, h, gData, options){
	
	var paper = Raphael(document.getElementById(holder), w, h);
	var margin = 20;
	var	endPath = w - margin;

	this.setOptions = function(oo){
		this.showLegends = (oo.showLegends) ? oo.showLegends : false;
		this.showXaxis = (oo.showXaxis != undefined) ? oo.showXaxis : true;
		this.showYaxis = (oo.showYaxis != undefined) ? oo.showYaxis : true;
		this.showGrid = (oo.showGrid != undefined) ? oo.showGrid : false;
		this.title = (oo.title != undefined) ? oo.title : false;
		this.xLabel = (oo.xLabel != undefined) ? oo.xLabel : false;
		this.yLabel = (oo.yLabel != undefined) ? oo.yLabel : false;
		this.gridSpace = (oo.gridSpace != undefined) ? options.gridSpace : 10;
		this.multicolor = (oo.multicolor != undefined) ? oo.multicolor : false;
		this.showValue = (oo.showValue != undefined) ? oo.showValue : false;
		this.showPercent = (oo.showPercent != undefined) ? oo.showPercent : false;
		this.showLabel = (oo.showLabel != undefined) ? oo.showLabel : false;
	}
	this.drawXaxis = function(){
		x_path = "M "+margin+" "+endPath+" L "+endPath+" "+endPath;
		var c = paper.path(x_path);
	}
	this.drawYaxis = function(){
		y_path = "M "+margin+" "+margin+" L "+margin+" "+endPath;
		var c = paper.path(y_path);
	}

	this.drawGrid = function(){
		gridSpace = this.gridSpace;
		var g;
		for(i=(gridSpace+margin);i<=endPath;i+=gridSpace){
			y_Path = "M "+i+" "+margin+" L " + i+" "+endPath;
			g = paper.path(y_Path);
			g.attr({stroke: "#ded9d9"});
		}
		
		for(i=(w-gridSpace-margin);(i>=gridSpace && i>=margin);i-=gridSpace){
			x_Path = "M "+margin+" "+i+" L "+endPath+" "+i;
			g = paper.path(x_Path);
			g.attr({stroke: "#ded9d9"});
		}
	}
	
	this.getColorCode = function(){
		//var colorCode = '#'+(function(h){return new Array(7-h.length).join("0")+h})((Math.random()*0x1000000<<0).toString(16));
		var colorCode = '#'+(function(h){return new Array(7-h.length).join("0")+h})((Math.random()*0x1000000<<0).toString(16));
		if(colorCode == "#ffffff")
			this.getColorCode();
		else
		return colorCode;
	}
	
	this.showBarDetails = function(key, val, percent, x,y){
		details = "";
		if(this.showLabel)
			details += key;
		if(this.showValue)
			details += "\n"+val;
		if(this.showPercent)
			details += "\n"+percent+"%";
		y = y - (details.split("\n").length * 10);
		paper.text(x+20, y, details);
	}
	
	this.drawBar = function(){
		highest = getMax(gData);
		//console.log(highest);
		var x = margin+20;
		for(var key in gData){
            var val = gData[key];
			y = h-val-margin;
			var c = paper.rect(x, y, 40, val-1);
			if(this.multicolor)
				colorCode = this.getColorCode();
			c.attr({"fill":colorCode, stroke: colorCode});
			if(this.showValue || this.showPercent || this.showLabel){
				percent = val / Object.keys(gData).length;
				this.showBarDetails(key, val, percent, x, y);
			}
			x+=60;
        }
	}
	
	this.writeTitle = function(){
		var xCenter = w/2;
		var yCenter = margin/2;
		paper.text(xCenter, yCenter, this.title);
	}
	this.writexLabel = function(){
		var xCenter = w/2;
		var yCenter = h-(margin/2);
		paper.text(xCenter, yCenter, this.xLabel);
	}
	this.writeyLabel = function(){
		var xCenter = margin/2;
		var yCenter = h/2;
		var yL = paper.text(xCenter, yCenter, this.yLabel);
		yL.rotate(270);
	}	
	this.setOptions(options);
	
	if(this.showXaxis)	this.drawXaxis();
	if(this.showYaxis)	this.drawYaxis();	
	if(this.showGrid)	this.drawGrid();
	if(this.title)	this.writeTitle();
	if(this.xLabel)	this.writexLabel();
	if(this.xLabel)	this.writeyLabel();
	this.drawBar();
}

function getMax(obj){
	var max = 0;
	for(var key in obj){
		if(obj[key] > max)
			max = obj[key];
	}
	return max;
}

// CODE TAKEN FRO MDC https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys#Compatiblity
if(!Object.keys) Object.keys = function(o){  
 if (o !== Object(o))  
      throw new TypeError('Object.keys called on non-object');  
 var ret=[],p;  
 for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);  
 return ret;  
} 