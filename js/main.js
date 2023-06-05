mapboxgl.accessToken =
  "pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o1dXByYjYxMXJmMTJ3bWxjZXo5YzkydCJ9.ic11CV05aSv7rYdx22nSDw";
var map = new mapboxgl.Map({
  container: "map", // container id
  //  style: 'mapbox://styles/mapbox/light-v9',
  style: "mapbox://styles/noeltech/cj5xoxw3r0js52rnv5mse61p6", // stylesheet location
  maxBounds: [
    [119.9902, 9.119],
    [125.3564, 13.0414],
  ],
  maxZoom: 12,
  zoom: 2,
});

map.addControl(new mapboxgl.NavigationControl());
// Add Sources
map.on("load", function () {
  map.addSource("MunicipalSource", {
    type: "vector",
    url: "mapbox://noeltech.c8nzzthb",
  });
  map.addSource("RegionSource", {
    type: "vector",
    url: "mapbox://noeltech.7nj0a7eq",
  });
  map.addSource("ProvinceSource", {
    type: "vector",
    url: "mapbox://noeltech.1klagk8c",
  });
  map.addSource("BarangaySource", {
    type: "vector",
    url: "mapbox://noeltech.4x113pz2",
  });

  // add Region 6 Fill layer for highlight
  map.addLayer({
    id: "RegionFill",
    type: "fill",
    source: "RegionSource",
    "source-layer": "region6_shapfile-at3ws3",
    layout: {},
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": 0,
    },
  });
  // add Region 6 Line Border for highlight
  map.addLayer({
    id: "RegionBorderHover",
    type: "line",
    source: "RegionSource",
    "source-layer": "region6_shapfile-at3ws3",
    layout: {},
    paint: {
      "line-color": "#4d534f",
      "line-width": 6,
      "line-blur": 2,
    },
    filter: ["==", "Name", ""],
  });
  // add Province fill layer for hightlight
  map.addLayer({
    id: "ProvinceFill",
    type: "fill",
    source: "ProvinceSource",
    "source-layer": "R6_provinces-1r9dvs",
    layout: {},
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": 0,
    },
  });
  // Add Province Border layer for highlight
  map.addLayer({
    id: "ProvinceBorderHover",
    type: "line",
    source: "ProvinceSource",
    "source-layer": "R6_provinces-1r9dvs",
    layout: {},
    paint: {
      "line-color": "#5d5c59",
      "line-width": 6,
      "line-blur": 2,
    },
    filter: ["==", "NAME_1", ""],
  });
  //  add Municipal Fill Layer
  map.addLayer({
    id: "MunicipalFill",
    type: "fill",
    source: "MunicipalSource",
    "source-layer": "R6_Pop_byMunicipal-5cqj12",
    layout: { visibility: "visible" },
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": 0,
    },
  });
  //add Municipal Fill hover layer
  map.addLayer({
    id: "MunicipalFillHover",
    type: "line",
    source: "MunicipalSource",
    "source-layer": "R6_Pop_byMunicipal-5cqj12",
    layout: {},
    paint: {
      "line-color": "#e2a124",
      "line-width": 10,
      "line-blur": 5,
    },
    filter: ["==", "NAME_2", ""],
  });

  //add Region 6 Fill layer for hover

  // Funtion Highlight feature when hover
  //add Barangay Fill layer for highlight
  map.addLayer({
    id: "BarangayFill",
    type: "fill",
    source: "BarangaySource",
    "source-layer": "PanayBarangay-bsk2mm",
    layout: { visibility: "visible" },
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": 0,
    },
  });
  //add Municipal Fill hover layer
  //add Barangay Border layer For highlight
  map.addLayer({
    id: "BarangayBorderHover",
    type: "line",
    source: "BarangaySource",
    "source-layer": "PanayBarangay-bsk2mm",
    layout: {},
    paint: {
      "line-color": "#e2a124",
      "line-width": 10,
      "line-blur": 5,
    },
    filter: ["==", "NAME_3", ""],
  });

  //add Region 6 Fill layer for hover

  // Funtion Highlight feature when hover

  map.on("mousemove", "MunicipalFill", function (e) {
    if (map.getZoom() > 9 && map.getZoom() <= 10.1) {
      //map.setLayoutProperty("MunicipalFill","visibility","visible");
      map.setFilter("MunicipalFillHover", [
        "==",
        "NAME_2",
        e.features[0].properties.NAME_2,
      ]);
    }
  });
  // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
  map.on("mouseleave", "MunicipalFill", function () {
    map.setFilter("MunicipalFillHover", ["==", "NAME_2", ""]);
  });
  // Highlight Function For Region hover
  map.on("mousemove", "RegionFill", function (e) {
    if (map.getZoom() <= 8) {
      map.setFilter("RegionBorderHover", [
        "==",
        "Name",
        e.features[0].properties.Name,
      ]);
    }
  });
  // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
  map.on("mouseleave", "RegionFill", function () {
    map.setFilter("RegionBorderHover", ["==", "Name", ""]);
  });
  map.on("mousemove", "ProvinceFill", function (e) {
    if (map.getZoom() > 8 && map.getZoom() <= 9) {
      map.setFilter("ProvinceBorderHover", [
        "==",
        "NAME_1",
        e.features[0].properties.NAME_1,
      ]);
    }
  });
  // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
  map.on("mouseleave", "ProvinceFill", function () {
    map.setFilter("ProvinceBorderHover", ["==", "NAME_1", ""]);
  });
  map.on("mousemove", "BarangayFill", function (e) {
    if (map.getZoom() > 10.1) {
      map.setFilter("BarangayBorderHover", [
        "==",
        "NAME_3",
        e.features[0].properties.NAME_3,
      ]);
    }
  });
  // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
  map.on("mouseleave", "BarangayFill", function () {
    map.setFilter("BarangayBorderHover", ["==", "NAME_3", ""]);
  });

  //  map.setLayoutProperty('n_Region6 Municipals', 'visibility', 'none');
  // Format  number to thousands/currency
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // show Features Name and Population Count When Hover
  map.on("mousemove", function (e) {
    switch (true) {
      case map.getZoom() <= 8:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["n_Region6 Panay Island"],
        });
        if (states.length > 0) {
          document.getElementById("pd").innerHTML =
            "<h3><strong>" +
            states[0].properties.Name +
            "</strong></h3><p><strong><em>" +
            String(states[0].properties.Population).replace(
              /(.)(?=(\d{3})+$)/g,
              "$1,"
            ) +
            "</strong>  People in this Region</em></p>";
        } else {
          document.getElementById("pd").innerHTML =
            "<p>Hover over a region!</p>";
        }
        break;
      case map.getZoom() > 8 && map.getZoom() <= 9:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["Provinces"],
        });
        if (states.length > 0) {
          document.getElementById("pd").innerHTML =
            "<h3><strong>" +
            states[0].properties.NAME_1 +
            "</strong></h3><p><strong><em>" +
            states[0].properties.Population +
            "</strong>  People in this Province</em></p>";
        } else {
          document.getElementById("pd").innerHTML =
            "<p>Hover over a region!</p>";
        }
        break;
      case map.getZoom() > 9 && map.getZoom() <= 10.1:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["n_Region6 Municipals"],
        });
        if (states.length > 0) {
          document.getElementById("pd").innerHTML =
            "<h3><strong>" +
            states[0].properties.NAME_2 +
            "</strong></h3><p><strong><em>" +
            states[0].properties.Population +
            "</strong>  People in this Municipal/City</em></p>";
        } else {
          document.getElementById("pd").innerHTML =
            "<p>Hover over a region!</p>";
        }
        break;
      case map.getZoom() > 10.1:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["n_Region6 Barangays"],
        });
        if (states.length > 0) {
          document.getElementById("pd").innerHTML =
            "<h3><strong>" +
            states[0].properties.NAME_3 +
            "</strong></h3><p><strong><em>" +
            states[0].properties.Population +
            "</strong>  People in this Barangay</em></p>";
        } else {
          document.getElementById("pd").innerHTML =
            "<p>Hover over a region!</p>";
        }
        break;
    }
    map.getCanvas().style.cursor = "default";
  });
  /*  var MunicipalName = states[0].properties.NAME_2;
    var highlight =   {
         property: 'NAME_2',
         type: "categorical",
         stops: [[MunicipalName, 'blue']]
       };
 map.setPaintProperty('n_Region6 Municipals', 'fill-color', highlight);   */

  //declare variable for legend display
  var IslandLegend = document.getElementById("island-legend");
  var ProvinceLegend = document.getElementById("province-legend");
  var MunicipalLegend = document.getElementById("municipal-legend");
  var BarangayLegend = document.getElementById("barangay-legend");
  // Show/Hide Legend for specific level
  map.on("zoom", function () {
    var zoom_level = map.getZoom();
    // Displays zoom level
    document.getElementById("zoom-level").innerHTML =
      '<p style="margin:0;, padding:0;">' + zoom_level + "</p>";
    //toggle legend display
    switch (true) {
      case map.getZoom() <= 8:
        IslandLegend.style.display = "block";
        ProvinceLegend.style.display = "none";
        MunicipalLegend.style.display = "none";
        BarangayLegend.style.display = "none";
        map.setFilter("ProvinceBorderHover", ["==", "NAME_1", ""]);

        break;
      case map.getZoom() > 8 && map.getZoom() <= 9:
        IslandLegend.style.display = "none";
        ProvinceLegend.style.display = "block";
        MunicipalLegend.style.display = "none";
        BarangayLegend.style.display = "none";
        // remove filter when zoom in/out
        map.setFilter("MunicipalFillHover", ["==", "NAME_2", ""]);
        map.setFilter("RegionBorderHover", ["==", "Name", ""]);
        break;
      case map.getZoom() > 9 && map.getZoom() <= 10.1:
        IslandLegend.style.display = "none";
        ProvinceLegend.style.display = "none";
        MunicipalLegend.style.display = "block";
        BarangayLegend.style.display = "none";
        map.setFilter("ProvinceBorderHover", ["==", "NAME_1", ""]);
        map.setFilter("BarangayBorderHover", ["==", "NAME_3", ""]);
        break;
      case map.getZoom() > 10.1:
        IslandLegend.style.display = "none";
        ProvinceLegend.style.display = "none";
        MunicipalLegend.style.display = "none";
        BarangayLegend.style.display = "block";
        map.setFilter("MunicipalFillHover", ["==", "NAME_2", ""]);
        break;
    }
  });

  // Show Popup when feature is click
  map.on("click", function (e) {
    switch (true) {
      case map.getZoom() <= 8:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["n_Region6 Panay Island"],
        });
        if (states.length > 0) {
          //popup only when the mouse pointer is at range of feature
          var PopupHTML =
            "<h3><strong>" +
            states[0].properties.Name +
            "</strong></h3><p><strong>" +
            states[0].properties.Population +
            '</strong> People In this Municipality </p> \
                <a href="https://com">Visit AwesomePlace.com</a> <br> \
                <img src="images/molo-church.jpg" alt="Molo Church" height="150" width="200">';
          ShowPopup(e.lngLat, PopupHTML);
        }
        break;
      case map.getZoom() > 8 && map.getZoom() <= 9:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["Provinces"],
        });
        if (states.length > 0) {
          //popup only when the mouse pointer is at range of feature
          var PopupHTML =
            "<h3><strong>" +
            states[0].properties.NAME_1 +
            "</strong></h3><p><strong>" +
            states[0].properties.Population +
            '</strong> People In this Municipality </p> \
                <a href="https://.com">Visit AwesomePlace.com</a> <br> \
                <img src="images/molo-church.jpg" alt="Molo Church" height="150" width="200">';
          ShowPopup(e.lngLat, PopupHTML);
        }
        break;
      case map.getZoom() > 9 && map.getZoom() <= 10.1:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["n_Region6 Municipals"],
        });
        if (states.length > 0) {
          //popup only when the mouse pointer is at range of feature
          var PopupHTML =
            "<h3><strong>" +
            states[0].properties.NAME_2 +
            "</strong></h3><p><strong>" +
            states[0].properties.Population +
            '</strong> People In this Municipality </p> \
                <a href="https://com">Visit AwesomePlace.com</a> <br> \
                <img src="images/molo-church.jpg" alt="Molo Church" height="150" width="200">';
          ShowPopup(e.lngLat, PopupHTML);
        }
        break;
      case map.getZoom() > 10.1:
        var states = map.queryRenderedFeatures(e.point, {
          layers: ["n_Region6 Barangays"],
        });
        if (states.length > 0) {
          //popup only when the mouse pointer is at range of feature
          var PopupHTML =
            "<h3><strong>" +
            states[0].properties.NAME_3 +
            "</strong></h3><p><strong>" +
            states[0].properties.Population +
            '</strong> People In this Municipality </p> \
                  <a href="https://com">Visit AwesomePlace.com</a> <br> \
                  <img src="images/molo-church.jpg" alt="Molo Church" height="150" width="200">';
          ShowPopup(e.lngLat, PopupHTML);
        }
        break;
    }
  });
  function ShowPopup(longlat, setHTML) {
    var Popup = new mapboxgl.Popup()
      .setLngLat(longlat)
      .setHTML(setHTML)
      .addTo(map);
  }
});
