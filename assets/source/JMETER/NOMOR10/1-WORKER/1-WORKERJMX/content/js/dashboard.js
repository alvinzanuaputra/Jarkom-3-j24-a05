/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 96.32721202003339, "KoPercent": 3.672787979966611};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3761825264329438, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5836120401337793, 500, 1500, "Access Home-0"], "isController": false}, {"data": [0.560200668896321, 500, 1500, "Access Home-1"], "isController": false}, {"data": [0.12, 500, 1500, "Logout"], "isController": false}, {"data": [0.3896321070234114, 500, 1500, "Access Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [0.49166666666666664, 500, 1500, "Login-0"], "isController": false}, {"data": [0.45652173913043476, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.39166666666666666, 500, 1500, "Login-1"], "isController": false}, {"data": [0.7307692307692307, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.08, 500, 1500, "Access Home"], "isController": false}, {"data": [0.7140468227424749, 500, 1500, "Logout-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3594, 132, 3.672787979966611, 4605.341124095721, 1, 104509, 1215.5, 16767.0, 18316.5, 27124.65000000005, 33.76455004086694, 180.23647522911324, 7.342911816653045], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Access Home-0", 299, 0, 0.0, 867.6521739130434, 27, 8049, 572.0, 1572.0, 1805.0, 7536.0, 10.662577562228087, 1.2182827878717637, 1.395298235682191], "isController": false}, {"data": ["Access Home-1", 299, 0, 0.0, 1347.8762541806022, 37, 15532, 592.0, 3009.0, 3842.0, 10192.0, 11.192633076289587, 10.73988445899154, 1.32256699436625], "isController": false}, {"data": ["Logout", 300, 19, 6.333333333333333, 3731.436666666668, 1, 20802, 2457.0, 7349.400000000003, 10459.549999999992, 19662.290000000015, 3.4694113565398403, 37.21816679556493, 1.5735903709378976], "isController": false}, {"data": ["Access Home-2", 299, 18, 6.0200668896321075, 2291.220735785953, 200, 22184, 1243.0, 5628.0, 7940.0, 15816.0, 10.982552800734618, 106.32310319100091, 1.2977430555555556], "isController": false}, {"data": ["Login", 300, 29, 9.666666666666666, 19390.67666666665, 15799, 104509, 18026.0, 21900.80000000001, 29668.699999999997, 32977.69, 2.818542249948327, 29.673056805957458, 1.3617632741596046], "isController": false}, {"data": ["Login-0", 300, 0, 0.0, 907.6199999999994, 305, 2180, 813.0, 1364.7, 1661.95, 2143.8900000000003, 74.09236848604593, 8.465631946159546, 18.8125154359101], "isController": false}, {"data": ["Logout-2", 299, 18, 6.0200668896321075, 2202.2140468227426, 147, 20026, 913.0, 5437.0, 9262.0, 15420.0, 11.078998073217727, 107.26226268387802, 1.309139420761079], "isController": false}, {"data": ["Login-1", 300, 0, 0.0, 1101.6500000000005, 258, 3349, 846.0, 1705.9, 2422.95, 3336.98, 71.20816520294328, 67.95882907073344, 8.414246083550914], "isController": false}, {"data": ["Logout-1", 299, 0, 0.0, 798.752508361204, 35, 6887, 434.0, 1686.0, 3686.0, 5606.0, 11.272809530990802, 10.825212248812395, 1.3320409699705926], "isController": false}, {"data": ["Login-2", 300, 29, 9.666666666666666, 17327.103333333333, 11248, 103044, 16083.5, 19900.80000000001, 27783.949999999993, 30963.270000000004, 2.8578505153657097, 27.032912241959913, 0.31743351329853103], "isController": false}, {"data": ["Access Home", 300, 19, 6.333333333333333, 4492.856666666667, 1, 23206, 3340.0, 9072.600000000002, 10883.999999999993, 17482.81000000001, 3.383827560147535, 36.29916199157991, 1.2383575183008675], "isController": false}, {"data": ["Logout-0", 299, 0, 0.0, 740.4214046822742, 32, 5983, 490.0, 1461.0, 2438.0, 5947.0, 11.124339608601831, 1.2710427091859513, 2.4334492893816506], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 18, 13.636363636363637, 0.5008347245409015], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 18, 13.636363636363637, 0.5008347245409015], "isController": false}, {"data": ["520", 4, 3.0303030303030303, 0.11129660545353366], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com", 1, 0.7575757575757576, 0.027824151363383415], "isController": false}, {"data": ["525", 90, 68.18181818181819, 2.5041736227045077], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, 0.7575757575757576, 0.027824151363383415], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3594, 132, "525", 90, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 18, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 18, "520", 4, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 300, 19, "525", 17, "520", 1, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com", 1, "", "", "", ""], "isController": false}, {"data": ["Access Home-2", 299, 18, "525", 17, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Login", 300, 29, "525", 11, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 9, "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout-2", 299, 18, "525", 17, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Login-2", 300, 29, "525", 11, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 9, "", "", "", ""], "isController": false}, {"data": ["Access Home", 300, 19, "525", 17, "520", 1, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
