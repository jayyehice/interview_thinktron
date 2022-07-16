
window.addEventListener("load", function(){
    new Vue({
        el: '#rain_map',
    
        data: {              

        },
        methods: {},
        computed: {},
        watch: {},
        
        created() {
            // const url = './php/information.php';
            // fetch(url)
            //     .then(response => {
            //         if (response.ok) {
            //             return response.json();
            //         } else {
            //             const { status, statusText } = response;
            //          throw Error(`${status}: ${statusText}`);
            //         }
            //     })
            //     .then(text => this.faq_list = text);

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