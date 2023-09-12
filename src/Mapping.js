// Import the CSS file
require("./App.css");

// Import React's useEffect
const { useEffect } = require("react");

// Import ArcGIS modules
const Map = require("https://js.arcgis.com/4.22/@arcgis/core/Map.js");
const MapView = require("https://js.arcgis.com/4.22/@arcgis/core/views/MapView.js");
const FeatureLayer = require("https://js.arcgis.com/4.22/@arcgis/core/layers/FeatureLayer.js");
const BasemapToggle = require("https://js.arcgis.com/4.22/@arcgis/core/widgets/BasemapToggle.js");


function Mapping() {
  useEffect(() => {
    const myMap = new Map({ basemap: "topo-vector" });
    const myView = new MapView({ map: myMap, container: "MapApp" });

    let myBasemapToggle = new BasemapToggle({
        view: myView,
        nextBasemap: "hybrid"
    })

    const myLayer = new FeatureLayer({
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
      definitionExpression: "POP2000 > 1000000",
    });

    myLayer.renderer = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: 10,
        color: "blue",
      },
    };

    myLayer.popupTemplate = {
        content: "{areaname} has {POP2000} people living in this census tract"
    }

    myView.center = [-104.891, 39.6004];
    myView.zoom = 18;
    myView.ui.add(myBasemapToggle, "top-right")
    myMap.add(myLayer)
  }, []);

  return <div id="MapApp" style={{ height: "100vh" }}></div>;
}

export default Mapping;