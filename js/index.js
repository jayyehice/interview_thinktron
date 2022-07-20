
window.addEventListener("load", function(){
    new Vue({
        el: '#rain_map',
    
        data: {              
            station: {},
            rainfallnow:{},
            rainfall: [],
            hour:[],
            station_name:'',
        },
        methods: {
            stationLocation(id){
                // console.log(id);
                this.station_name = this.station[id][3];
                //抓取某站24小時資料
                let url = `http://127.0.0.1:5000/rainfall?id=${id}`;
                fetch(url, {
                        mode: 'cors'
                    })
                    .then(response => response.json())
                    .then(text => {
                        let temp_h = [];
                        let temp_r = [];
                        for (i in text){
                            temp_r.push(Number(text[i][3]));
                            let dateTime = new Date(text[i][2]);
                            temp_h.push(String(dateTime.getHours()));
                        }
                        this.rainfall = temp_r;
                        this.hour = temp_h;

                        // Bar Chart 
                        let ctx = document.getElementById("myBarChart");
                        let myLineChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: temp_h,
                                datasets: [{
                                    label: "Revenue",
                                    backgroundColor: "rgba(2,117,216,1)",
                                    borderColor: "rgba(2,117,216,1)",
                                    data: temp_r,
                                }],
                            },
                            options: {
                                scales: {
                                    xAxes: [{
                                        time: {
                                            unit: 'hour'
                                        },
                                        gridLines: {
                                            display: false
                                        },
                                        ticks: {
                                            maxTicksLimit: 24
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            min: 0,
                                            max: 200,
                                            maxTicksLimit: 5
                                        },
                                        gridLines: {
                                            display: true
                                        }
                                    }],
                                },
                                legend: {
                                    display: false
                                }
                            }
                        });

                    })

                
            },
        },
        computed: {},
        watch: {},
        
        created() {
            
        },
        mounted() {


            let url = 'http://127.0.0.1:5000/station/';
            fetch(url, {
                    mode: 'cors'
                })
                .then(response => response.json())
                .then(text => {
                    // console.log(text);
                    this.station=text;
                })


            //同時抓取全部觀測站最近1小時資料
            let url2 = `http://127.0.0.1:5000/rainfallnow/`;
            fetch(url2, {
                    mode: 'cors'
                })
                .then(response => response.json())
                .then(text => {
                    // console.log(text);
                    this.rainfallnow=text;
                })
            
            
            // *** 放置地圖
            const map = L.map('map', {
                center: [25, 121.5], // 中心點座標
                zoom: 10, // 0 - 18
                attributionControl: true, // 是否秀出「leaflet」的貢獻標記
                zoomControl: true , // 是否秀出 - + 按鈕
            });
            L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png').addTo(map);

            setTimeout(e => {
                // 放置marker
                for(let i in this.station) {
                    let marker = L.marker([this.station[i][1], this.station[i][2]]).addTo(map);
   
                    // 標記上放泡泡
                    marker.addEventListener('mouseover', e => {
                        // this.stationLocation(this.station[i][0]);
                        let dateTime = new Date(this.rainfallnow[this.station[i][0]][2]);
                        // console.log(dateTime.getHours());
                        

                        marker.bindPopup(`${this.station[i][3]}觀測站<br>${dateTime.getHours()}點，即時雨量 ${this.rainfallnow[this.station[i][0]][3]}`)

                        marker.openPopup()
                    })
                    

                    //click事件
                    marker.addEventListener('click', e => {
                        this.stationLocation(this.station[i][0])
                    })
                }
            }, 500)

            // document.getElementById('test').addEventListener("click", e => {
            //     console.log(map.getCenter());
            // })

            
            
        },
        updated() {
            

        },
    })


});