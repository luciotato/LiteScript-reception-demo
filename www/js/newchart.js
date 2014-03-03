function create_chart3()
{
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart3'
            },
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: ['8 AM', '9 AM', '10 AM', '11 AM', '12 AM']
            },
            tooltip: {
                formatter: function() {
                    var s;
                    if (this.point.name) { // the pie chart
                        s = ''+
                            this.point.name +': '+ this.y +' fruits';
                    } else {
                        s = ''+
                            this.x  +': '+ this.y;
                    }
                    return s;
                }
            },
            labels: {
                items: [{
                    html: 'Total Check-Ins by Room Type',
                    style: {
                        left: '40px',
                        top: '8px',
                        color: 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: 'Basic',
                data: [3, 2, 1, 3, 4]
            }, {
                type: 'column',
                name: 'Suite',
                data: [2, 3, 5, 7, 6]
            }, {
                type: 'column',
                name: 'Studio',
                data: [4, 3, 3, 9, 0]
            }, {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33, 3.33],
                marker: {
                    lineWidth: 2,
                	lineColor: Highcharts.getOptions().colors[3],
                	fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total Check Ins',
                data: [{
                    name: 'Basic',
                    y: 13,
                    color: '#4572A7' // Jane's color
                }, {
                    name: 'Suite',
                    y: 23,
                    color: '#AA4643' // John's color
                }, {
                    name: 'Studio',
                    y: 19,
                    color: '#89A54E' // Joe's color
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });

};

