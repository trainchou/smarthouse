var confdata;
function getconf(json) {
    confdata = json;
}

var jsondata;
function getjson(json) {
    jsondata = json;
}

function init() {
    var gridlon = new Array();
    var gridlat = new Array();
    var nx = confdata[0].nx;
    var ny = confdata[0].ny;
    var rightbottomlon = confdata[0].rightbottomlon;
    var lefttoplon = confdata[0].lefttoplon;
    var lefttoplat = confdata[0].lefttoplat;
    var rightbottomlat = confdata[0].rightbottomlat;
    var deltalon = (rightbottomlon - lefttoplon) / nx;
    var deltalat = (lefttoplat - rightbottomlat) / ny;
    for (var i = 0; i < nx * ny; i++) {
        gridlon[i] = lefttoplon + (i % nx + 0.5) * deltalon;
        gridlat[i] = lefttoplat - (i / nx + 0.5) * deltalat;
    }

    var data = new Array();
    var arr = jsondata[0].data;
    for (var i = 0; i < arr.length; i++) {
        data[i] = [gridlat[i], gridlon[i], arr[i]];
    }


    var map = new L.Map("map");
    var markerLayers = new L.LayerGroup();
    var markerLayers2 = new L.LayerGroup();
    var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            cloudmadeAttrib = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
            cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib});
    map.addLayer(cloudmade);

    map.setView(new L.LatLng(31.81881, 117.2285), 11);
    var heatmap = new
            L.TileLayer.HeatCanvas({}, {'step': 10,
                'degree': HeatCanvas.LINEAR, 'opacity': 0.5});
    heatmap.onRenderingStart(function() {
        document.getElementById("status").innerHTML =
                'rendering';
    });
    heatmap.onRenderingEnd(function() {
        document.getElementById("status").innerHTML = '';
    });

    for (var i = 0; i < data.length; i++) {
        heatmap.pushData(data[i][0], data[i][1], data[i][2]*100);
        if (data[i][2] > 0) {
            var marker = new L.Marker(new L.LatLng(data[i][0], data[i][1]));
            marker.bindPopup(i+","+ data[i].toString());
            markerLayers.addLayer(marker);
        }
    }
//    var data2 = new Array();
//    data2 = [[31.84628759,117.0137033],[31.89433869,117.39291341],[31.8546395,117.18288298],[31.72010477,117.34161683],[31.75972366,117.19987126],[31.99972929,117.34305381],[31.7615892,117.18722038],[31.83212535,117.12907875],[31.94771119,117.37221908],[31.77495449,117.31229139],[31.91351739,117.32901366],[31.8420523,117.189075],[31.959209,117.25149895],[31.74307847,117.28083349],[31.75496898,117.19506028],[31.876,117.216],[31.81074834,117.24246499],[31.81061563,117.24684862],[31.81056169,117.2488665],[31.85454746,117.24766354],[31.79658235,117.31993527],[31.71356051,117.3300858],[31.71927196,117.34166442],[31.87742572,117.36342674],[31.87744526,117.36353242],[31.85887,117.25663],[31.85963169,117.25867731],[31.84337275,117.24581973],[31.84345603,117.24564911],[31.82377281,117.24644858],[31.81880163,117.24656474],[31.81880482,117.24662874],[31.81566569,117.24670574],[31.81562928,117.24668823],[31.79650334,117.35246749],[31.79211133,117.35304036],[31.78747498,117.35307944],[31.78305648,117.35305601],[31.78036279,117.35293614],[31.77763354,117.35300531],[31.77489953,117.35298485],[31.85785177,117.20332255],[31.95385085,117.25029311],[31.89331443,117.40890015],[31.83860859,117.37122616],[31.85443496,117.22557484],[31.74286192,117.28088594],[31.85863639,117.21067038],[31.85443685,117.22546066],[31.85860791,117.21069982],[31.88827329,117.24122887],[31.89614203,117.26467372],[31.79949061,117.350905],[31.89601966,117.26203718],[31.85442534,117.18492932],[31.78430496,117.12603064],[31.74267397,117.33257887],[31.75848796,117.2740283],[31.87706496,117.38304394],[31.98713679,117.25540707],[31.84669803,117.3416472],[31.90236091,117.22484737],[31.89368118,117.39315476],[31.72671634,117.22594744],[31.72345383,117.17339628],[31.74323789,117.28083587]];
//for (var i = 0; i < data2.length; i++) {
//            var tgmarker = new L.Marker(new L.LatLng(data2[i][0], data2[i][1]));
//            marker.bindPopup(i + "," + data2[i].toString());
//            markerLayers2.addLayer(tgmarker);
//    }
    
    map.addLayer(heatmap);
    map.addLayer(markerLayers);
//    map.addLayer(markerLayers2);
    L.control.layers({"heatmap": heatmap, "markers": markerLayers}).addTo(map);

    var popup = L.popup();

    function onMapClick(e) {
        popup
                .setLatLng(e.latlng)
                .setContent(e.latlng.toString())
                .openOn(map);
    }

    map.on('click', onMapClick);
}
