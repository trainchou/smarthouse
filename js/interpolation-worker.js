/**
 * Copyright 2010 Sun Ning <classicning@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
onmessage = function(e) {
    calc(e.data);
}

function calc(params) {
    value = params.value || {};
    degree = params.degree || 1;
    var dist = new Array();

    for (var pos in params.data) {
        var tempvalue = new Array();
        var data = params.data[pos];
//        var radius = Math.floor(Math.pow((data / params.step), 1 / degree));
        var step = params.step;
        var radius = 500;

        var x = Math.floor(pos % params.width);
        var y = Math.floor(pos / params.width);

        // calculate point x.y 
        for (var scanx = x - radius; scanx < x + radius; scanx += 1) {
            // out of extend
            if (scanx < 0 || scanx > params.width) {
                continue;
            }
            for (var scany = y - radius; scany < y + radius; scany += 1) {

                if (scany < 0 || scany > params.height) {
                    continue;
                }

                var d_real = Math.sqrt(Math.pow((scanx - x), 2) + Math.pow((scany - y), 2));
                var d = Math.pow(d_real, 2);
                if (d_real > radius) {
                    continue;
                } else {
//                    var v = data - params.step * Math.pow(d, degree);
                    if (d) {
                        var v = data / d;
                    } else {
                        var v = data / (d + 0.0000001);
                    }

                    var id = scanx + scany * params.width;
                    if (dist[id]) {
                        if (d) {
                            dist[id] = dist[id] + 1 / d;
                        } else {
                            dist[id] = dist[id] + 1 / (d + 0.0000001);
                        }
                    } else {
                        if (d) {
                            dist[id] = 1 / d;

                        } else {
                            dist[id] = 1 / (d + 0.0000001);
                        }
                    }
                    if (tempvalue[id]) {
                        tempvalue[id] = tempvalue[id] + v;
                    } else {
                        tempvalue[id] = v;
                    }
                }
            }
        }
        for (var i in tempvalue) {
            if (value[i]) {
                value[i] += tempvalue[i] / dist[i];
            } else {
                value[i] = tempvalue[i] / dist[i];
            }
        }
    }
    postMessage({'value': value});
}