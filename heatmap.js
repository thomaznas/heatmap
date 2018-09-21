var map; 
var pointarray;
var heatmap1,heatmap2,heatmap3;
var MY_MAPTYPE_ID = 'custom_style';

var featureOpts = [
    {
      stylers: [
        { color: '#333333' },
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'road.local',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
        featureType: 'road.arterial',
        stylers: [
          { visibility: 'off' }
        ]
      },


    {
      featureType: 'water',
      stylers: [
        { color: '#000000' }
      ]
    }
];

var myLatlng1 = {},
    myLatlng2 = {},
    myLatlng3 = {} ;

var isFirstTime2 = 1, isFirstTime3 = 1;    

var points1 = {},
    points2 = {},
    points3 = {}; 


function buildHeatmap(points) {
    //  build array of latLng
    // ---------------------------------
    var data = [];
    var obj = null;
    points.forEach(function(point){
        // check for crimes with no latLng
        if ( point.latitude && point.longitude ){        
            obj = new google.maps.LatLng(point.latitude, point.longitude);
            data.push(obj);
        }        
    });
    //  build heat layer
    // ---------------------------------
    var pointArray = new google.maps.MVCArray(data);
    return new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

  }

function initialize(){

    var myOptions1 = {
      zoom: 11,
      center: {},
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
      },
      mapTypeId: MY_MAPTYPE_ID
    };
  
    //  build map
    // ---------------------------------
    myLatlng1 = new google.maps.LatLng(41.886903, -87.722740);  // Chicago
    myLatlng2 = new google.maps.LatLng(37.804363, -122.271111);  // Oakland
    myLatlng3 = new google.maps.LatLng(36.114647, -115.172813);  // LasVegas
    
    myOptions1.center = myLatlng1;

    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions1);

    //  customize map
    // ---------------------------------
    var styledMapOptions = {
        name: 'Custom Style'
    };
    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    map.setMapTypeId('roadmap');

    points1 = chicago.data.map(point1);
    heatmap1 = buildHeatmap(points1);
    heatmap1.setMap(map); 
  
}

function point1(crime){
  var point = {};
  
  point.latitude = crime[29][1];
  point.longitude = crime[29][2];
  
  return point;
}

function point2(crime){
  var point = {};
  
  point.latitude = crime[16][1];
  point.longitude = crime[16][2];
  
  return point;
}

function point3(crime){
  var point = {};
  
  point.latitude = crime[17][1];
  point.longitude = crime[17][2];
  
  return point;
}

function onClick1() {

  map.setCenter(myLatlng1);
  
}

function onClick2() {
  
  if (isFirstTime2) {
    isFirstTime2 = 0;
    points2 = oakland.data.map(point2);
    heatmap2 = buildHeatmap(points2);
    heatmap2.setMap(map); 
  
  }
  map.setCenter(myLatlng2);
  
}

function onClick3() {
  
  if (isFirstTime3) {
    isFirstTime3 = 0;
    points3 = lasvegas.data.map(point3);
    heatmap3 = buildHeatmap(points3);
    heatmap3.setMap(map); 
  
  }
  map.setCenter(myLatlng3);
  
}

google.maps.event.addDomListener(window, 'load', initialize);
