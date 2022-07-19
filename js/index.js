
window.addEventListener("load", function(){
    new Vue({
        el: '#rain_map',
    
        data: {              

        },
        methods: {},
        computed: {},
        watch: {},
        
        created() {
            const url = 'http://127.0.0.1:5000/';
            fetch(url, {
                    mode: 'cors'
                })
                .then(response => response.json())
                .then(text => console.log(text));

        },
        mounted() {
            
            // *** 放置地圖
            const map = L.map('map', {
                center: [23.773, 120.959], // 中心點座標
                zoom: 10, // 0 - 18
                attributionControl: true, // 是否秀出「leaflet」的貢獻標記
                zoomControl: true , // 是否秀出 - + 按鈕
            });
            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png').addTo(map);

            document.getElementById('test').addEventListener("click", e => {
                console.log(myMap.getCenter());
            })

        },
        updated() {

        },
    })


});