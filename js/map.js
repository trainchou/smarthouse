var jsondata;
function getjson(json) {
    jsondata = json;
}
function init() {
    var map = new L.Map("map");
    var markerLayers = new L.LayerGroup();
    var cloudmadeUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            cloudmadeAttrib = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
            cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib});
    map.addLayer(cloudmade);

    map.setView(new L.LatLng(31.81881, 117.2285), 11);
    var heatmap = new
            L.TileLayer.HeatCanvas({}, {'step': 1,
                'degree': HeatCanvas.QUAD, 'opacity': 0.5});
    heatmap.onRenderingStart(function() {
        document.getElementById("status").innerHTML =
                'rendering';
    });
    heatmap.onRenderingEnd(function() {
        document.getElementById("status").innerHTML = '';
    });
    var data = new Array();
    for (var i = 0; i < jsondata.length; i++) {
//                for (var i = 0; i < 2; i++) {
        switch (jsondata[i].position_name) {
            case "明珠广场":
                data[i] = [31.7848, 117.196, jsondata[i].aqi];
                break;
            case "滨湖新区":
                data[i] = [31.7386, 117.278, jsondata[i].aqi];
                break;
            case "琥珀山庄":
                data[i] = [31.8706, 117.259, jsondata[i].aqi];
                break;
            case "庐阳区":
                data[i] = [31.9438, 117.266, jsondata[i].aqi];
                break;
            case "三里街":
                data[i] = [31.8766, 117.307, jsondata[i].aqi];
                break;
            case "瑶海区":
                data[i] = [31.8585, 117.336, jsondata[i].aqi];
                break;
            case "长江中路":
                data[i] = [31.8572, 117.25, jsondata[i].aqi];
                break;
            case "包河区":
                data[i] = [31.7956, 117.302, jsondata[i].aqi];
                break;
            case "董铺水库":
                data[i] = [31.9051, 117.16, jsondata[i].aqi];
                break;
            case "高新区":
                data[i] = [31.8516, 117.124, jsondata[i].aqi];
                break;
        }
    }
    for (var i = 0, l = data.length; i < l; i++) {
        heatmap.pushData(data[i][0], data[i][1], data[i][2]);
        if (data[i][2] > 20) {
            var marker = new L.Marker(new L.LatLng(data[i][0], data[i][1]));
            marker.bindPopup(data[i].toString());
            markerLayers.addLayer(marker);
        }
    }
    map.addLayer(heatmap);
    map.addLayer(markerLayers);
    L.control.layers({"heatmap": heatmap, "markers": markerLayers}).addTo(map);

    var popup = L.popup();

    function onMapClick(e) {
        popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
    }

    map.on('click', onMapClick);
}
