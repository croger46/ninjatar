/* 
 * Copyright (C) Sep 17 2014 Roger Praça (roger.praca@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


$.fn.ninjatar=function(options){
    console.log("---- LOADING NINJATAR ----");
    
    if(options.md5!==undefined && options.md5.length ===32){
        var ncanvas = this.find("canvas.ninjatar");
        
        var fcol    = options.md5.substring((options.md5.length-4),(options.md5.length-1));
        var bcol    = options.md5.substring((options.md5.length-7),(options.md5.length-4));
        if(this.ninjatarCanvas===undefined){
            if(ncanvas.length===0){
               //no canvas lets create one
               this.ninjatarCanvas=$('<canvas class="ninjatar" width="100" height="100"></canvas>').appendTo(this);      
            }else{
                this.ninjatarCanvas=$(ncanvas[0]);
            }
            this.ninjatarCanvas.loadMatrix =function(rows,cols,color){
                   this.cmatrix = {};
                    console.log("loading Matrix");
                    for( var r=0;r<rows;r++){
                        for(var c=0;c<cols;c++){
                            var id='r'+r+'c'+c;
                            this.cmatrix[id]={"r":r,"c":c,"color":color};
                        }
                    }
                };
                
                this.ninjatarCanvas.setCoordinate=function(r,c,color){
                    var txtId    = "r"+r+"c"+c;
                    if(this.cmatrix[txtId]!==undefined){
                        if(this.cmatrix[txtId]['color']===color){
                            this.setCoordinate((r>9)?r-1:r+1,c,color);
                        }else{
                            this.cmatrix[txtId]['color']=color;
                        }
                    }
                    
                };
                this.ninjatarCanvas.drawMatrix=function(){
                    var tmpCanvas =this[0];
                    if(tmpCanvas.getContext){
                        var ctx = tmpCanvas.getContext('2d');
                        for(var p in this.cmatrix){ 
                            var color = this.cmatrix[p]['color'];
                            ctx.fillStyle = color;
                            var rx=(this.cmatrix[p]['c']*10);
                            var ry=(this.cmatrix[p]['r']*10);
                            var mx=rx+(50-rx)*2-10;
                            ctx.fillRect(rx,ry,10,10);
                            ctx.fillStyle = color;
                            ctx.fillRect(mx,ry,10,10);
                        }
                    }

                };
            
            // we are supposed to have a valid canvas
            var maxRow=10;
            var maxCol=5;
            var coord =0;
            this.ninjatarCanvas.loadMatrix(10,5,"#"+bcol);
            while(coord < 32){
                var tr = options.md5.charCodeAt(coord);
                var tc = options.md5.charCodeAt(coord+1);
                if(tr > maxRow){
                    var mdiff = Math.floor(tr/maxRow);
                    tr=tr-(maxRow*mdiff);
                }
                if(tc > maxCol){
                    var mdiff = Math.floor(tc/maxCol);
                    tc=tc-(maxCol*mdiff);
                }

                this.ninjatarCanvas.setCoordinate(tr-1,tc-1,"#"+fcol);
                coord=coord+2;
            }
            this.ninjatarCanvas.drawMatrix();
        }
    }
};

