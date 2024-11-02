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

    var data = {"OkPercent": 95.71508069003896, "KoPercent": 4.2849193099610465};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3589315525876461, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5133779264214047, 500, 1500, "Access Home-0"], "isController": false}, {"data": [0.35618729096989965, 500, 1500, "Access Home-1"], "isController": false}, {"data": [0.135, 500, 1500, "Logout"], "isController": false}, {"data": [0.23411371237458195, 500, 1500, "Access Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [0.5516666666666666, 500, 1500, "Login-0"], "isController": false}, {"data": [0.4816053511705686, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.5466666666666666, 500, 1500, "Login-1"], "isController": false}, {"data": [0.7658862876254181, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.01, 500, 1500, "Access Home"], "isController": false}, {"data": [0.7157190635451505, 500, 1500, "Logout-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3594, 154, 4.2849193099610465, 4065.4351697273264, 1, 106924, 1259.0, 12133.5, 15374.0, 21767.10000000008, 32.257485459898035, 169.69075041679383, 7.0533448405076475], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Access Home-0", 299, 0, 0.0, 1281.327759197325, 31, 8384, 1046.0, 1507.0, 3258.0, 8358.0, 18.776689274051744, 2.1453834424453655, 2.457105822971615], "isController": false}, {"data": ["Access Home-1", 299, 0, 0.0, 1434.7826086956532, 39, 4572, 1760.0, 2317.0, 2496.0, 4544.0, 20.04155774515718, 19.229097543401032, 2.368191881996112], "isController": false}, {"data": ["Logout", 300, 32, 10.666666666666666, 3975.5866666666657, 1, 91590, 2554.5, 6575.800000000003, 14912.25, 18526.290000000008, 3.161089100564781, 32.63304851152217, 1.4337473591734806], "isController": false}, {"data": ["Access Home-2", 299, 20, 6.688963210702341, 3246.016722408027, 96, 16885, 2386.0, 6108.0, 14020.0, 15944.0, 11.46736212318785, 110.29534479989644, 1.3550300946345017], "isController": false}, {"data": ["Login", 300, 25, 8.333333333333334, 14472.510000000002, 9598, 106924, 12802.5, 19833.600000000002, 22568.6, 28988.150000000005, 2.80326674017455, 29.51931129576333, 1.374257718327758], "isController": false}, {"data": ["Login-0", 300, 0, 0.0, 844.2366666666674, 228, 2579, 710.5, 1544.7, 1773.0499999999997, 2134.8500000000004, 79.63897000265463, 9.099374502256438, 20.220832227236528], "isController": false}, {"data": ["Logout-2", 299, 31, 10.367892976588628, 2633.4715719063543, 72, 90304, 810.0, 5197.0, 14447.0, 16137.0, 3.17895721697712, 29.487949250313644, 0.3756384992717105], "isController": false}, {"data": ["Login-1", 300, 0, 0.0, 751.2766666666669, 238, 1550, 700.0, 1201.7, 1425.2499999999986, 1531.91, 82.7357970215113, 78.94427830253723, 9.776397890237176], "isController": false}, {"data": ["Logout-1", 299, 0, 0.0, 677.4816053511704, 38, 5708, 374.0, 2145.0, 2376.0, 4331.0, 12.25560519736033, 11.770105891605526, 1.4481720985162112], "isController": false}, {"data": ["Login-2", 300, 25, 8.333333333333334, 12799.73333333333, 7608, 105639, 11099.0, 18261.4, 20803.25, 27550.730000000003, 2.834467120181406, 26.81942894345238, 0.33493214994331066], "isController": false}, {"data": ["Access Home", 300, 21, 7.0, 5942.843333333333, 1, 20283, 5538.0, 9249.300000000007, 14950.149999999989, 19418.86, 3.2142283173514756, 34.27806046432207, 1.1762903787432368], "isController": false}, {"data": ["Logout-0", 299, 0, 0.0, 677.816053511706, 18, 6334, 492.0, 1264.0, 1827.0, 3481.0, 12.073490813648293, 1.379490649606299, 2.641076115485564], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["520", 4, 2.5974025974025974, 0.11129660545353366], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com", 1, 0.6493506493506493, 0.027824151363383415], "isController": false}, {"data": ["525", 148, 96.1038961038961, 4.117974401780746], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, 0.6493506493506493, 0.027824151363383415], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3594, 154, "525", 148, "520", 4, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com", 1, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 300, 32, "525", 30, "520", 1, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com", 1, "", "", "", ""], "isController": false}, {"data": ["Access Home-2", 299, 20, "525", 19, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Login", 300, 25, "525", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout-2", 299, 31, "525", 30, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Login-2", 300, 25, "525", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home", 300, 21, "525", 19, "520", 1, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
