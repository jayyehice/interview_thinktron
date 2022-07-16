
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
            let myMap = L.map('mapid', {
                center: [25.02152871889353, 121.54964447021486],
                zoom: 14
            });

            L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 14,
                attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            }).addTo(myMap);

            document.getElementById('test').addEventListener("click", e => {
                console.log(myMap.getCenter());
            })

        },
        updated() {

        },
    })


});