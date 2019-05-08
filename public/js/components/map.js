Vue.component('Map', {
    template: `<div id="gmap"></div>`,
    props: {
       cells: Array
    },
    data() {
        return {
            map: null,
            center: { lat: 51.033, lng: 28.1795 }
        }
    },
    computed: {
       
    },
    mounted() {
        const element = document.getElementById('gmap')
        const options = {
            zoom: 12,
            center: new google.maps.LatLng(this.center.lat, this.center.lng),
            panControl: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            draggable: true,
            scrollwheel: false,
            mapTypeId: 'roadmap',
            styles: []
        }
        this.map = new google.maps.Map(element, options)
    },
    methods: {
        
    },
    watch: {
        cells: function(cells) {
            let bounds = new google.maps.LatLngBounds()
            let centerMarker = {
                map: this.map,
                position: new google.maps.LatLng(this.center.lat, this.center.lng),
                icon: {
                    url: 'img/point.png',
                    scaledSize: new google.maps.Size(50, 50),
                    anchor: new google.maps.Point(25, 25)
                }
            }
            new google.maps.Marker(centerMarker)
            bounds.extend(centerMarker.position)
            let markers = []
            cells.forEach((cell) => {
                let marker = {
                    map: this.map,
                    position: new google.maps.LatLng(cell.LAT, cell.LNG),
                    icon: {
                        url: 'img/tower-cell.png',
                        scaledSize: new google.maps.Size(50, 50),
                        anchor: new google.maps.Point(25, 25)
                    }
                }
                markers.push(marker)
                bounds.extend(marker.position)
                new google.maps.Marker(marker)
            })
            if(markers.length){
                let points = [centerMarker.position, markers[0].position]
                new google.maps.Polyline({
                    path: points,
                    map: this.map,
                    strokeColor: "#009688",
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
                this.map.fitBounds(bounds)
            }
        }
    }
})