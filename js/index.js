
window.addEventListener("load", function(){
    new Vue({
        el: '#rain_map',
    
        data: {              
            station: {},
        },
        methods: {
            stationLocation(id){
                console.log(id);
            },
        },
        computed: {},
        watch: {},
        
        created() {
            
        },
        mounted() {

            let station={};

            const url = 'http://127.0.0.1:5000/station/';
            fetch(url, {
                    mode: 'cors'
                })
                .then(response => response.json())
                .then(text => {
                    console.log(text);
                    this.station=text;
                })
            
            
            // *** 放置地圖
            const map = L.map('map', {
                center: [23.773, 120.959], // 中心點座標
                zoom: 10, // 0 - 18
                attributionControl: true, // 是否秀出「leaflet」的貢獻標記
                zoomControl: true , // 是否秀出 - + 按鈕
            });
            L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png').addTo(map);

            setTimeout(e => {
                // *** 放置marker
                for(let i in this.station) {
                    let marker = L.marker([this.station[i][1], this.station[i][2]]).addTo(map);
                    marker.addEventListener('click', e => {
                        this.stationLocation(this.station[i][0]);
                    })
                }
            }, 500)

            document.getElementById('test').addEventListener("click", e => {
                console.log(map.getCenter());
            })

            
        },
        updated() {
            

        },
    })


});