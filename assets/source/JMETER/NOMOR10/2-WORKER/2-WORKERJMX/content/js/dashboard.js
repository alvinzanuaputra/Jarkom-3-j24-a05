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

    var data = {"OkPercent": 96.44444444444444, "KoPercent": 3.5555555555555554};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3736111111111111, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5166666666666667, 500, 1500, "Access Home-0"], "isController": false}, {"data": [0.6716666666666666, 500, 1500, "Access Home-1"], "isController": false}, {"data": [0.105, 500, 1500, "Logout"], "isController": false}, {"data": [0.5116666666666667, 500, 1500, "Access Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [0.28, 500, 1500, "Login-0"], "isController": false}, {"data": [0.43333333333333335, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.4666666666666667, 500, 1500, "Login-1"], "isController": false}, {"data": [0.755, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.04666666666666667, 500, 1500, "Access Home"], "isController": false}, {"data": [0.6966666666666667, 500, 1500, "Logout-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3600, 128, 3.5555555555555554, 4229.818611111119, 19, 36352, 1335.5, 15100.0, 16753.699999999997, 20207.929999999957, 56.01630696936219, 298.3090806712621, 12.25356714954798], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Access Home-0", 300, 0, 0.0, 1388.3799999999997, 34, 11732, 849.5, 2373.7000000000003, 6498.849999999999, 8111.930000000004, 14.3000143000143, 1.6338883526383527, 1.8712909337909338], "isController": false}, {"data": ["Access Home-1", 300, 0, 0.0, 1051.5866666666666, 37, 9787, 506.5, 2215.8, 3489.4499999999985, 7169.9000000000015, 14.682850430696947, 14.093098830878036, 1.734985255971026], "isController": false}, {"data": ["Logout", 300, 19, 6.333333333333333, 4020.433333333333, 114, 17610, 3074.5, 7911.3, 9120.15, 16403.820000000003, 6.384880602732729, 68.48973297897247, 2.90561949304048], "isController": false}, {"data": ["Access Home-2", 300, 22, 7.333333333333333, 1895.733333333332, 130, 20003, 807.5, 5188.7, 6475.0499999999965, 14972.080000000002, 9.879470460383324, 94.43461642955938, 1.1673983649476387], "isController": false}, {"data": ["Login", 300, 23, 7.666666666666667, 17094.933333333327, 13675, 36352, 16594.5, 19621.100000000002, 21062.85, 29698.69, 8.250144377526606, 87.39177593811017, 4.04450437257652], "isController": false}, {"data": ["Login-0", 300, 0, 0.0, 1518.5266666666664, 338, 3368, 1433.0, 2613.3, 3202.3499999999935, 3357.86, 62.94586655476291, 7.192057018464121, 15.982348929920269], "isController": false}, {"data": ["Logout-2", 300, 19, 6.333333333333333, 2212.6466666666674, 52, 16770, 1181.0, 5188.5, 6987.099999999998, 15886.120000000006, 6.489573418707278, 62.64314241368867, 0.7668343590464654], "isController": false}, {"data": ["Login-1", 300, 0, 0.0, 994.6766666666665, 180, 3372, 784.5, 1947.1000000000026, 3138.7, 3367.91, 68.21282401091405, 65.09972572760346, 8.06030439972715], "isController": false}, {"data": ["Logout-1", 300, 0, 0.0, 731.8600000000007, 37, 5736, 435.0, 1536.6000000000004, 2473.75, 4471.88, 10.102710894089913, 9.695708452601448, 1.1937773615086715], "isController": false}, {"data": ["Login-2", 300, 23, 7.666666666666667, 14437.186666666663, 10445, 32491, 13929.5, 17311.100000000006, 18715.399999999998, 27547.560000000012, 8.607580409146989, 81.97977823824348, 1.0171066694402202], "isController": false}, {"data": ["Access Home", 300, 22, 7.333333333333333, 4336.936666666666, 882, 20638, 2907.0, 9096.500000000007, 10631.849999999999, 17386.12000000001, 9.382623381497467, 99.76321703767123, 3.445182022893601], "isController": false}, {"data": ["Logout-0", 300, 0, 0.0, 1074.9233333333339, 19, 8761, 467.5, 2263.600000000004, 4875.599999999996, 8308.29, 9.94563055297706, 1.136365990916324, 2.1756066834637315], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["520", 12, 9.375, 0.3333333333333333], "isController": false}, {"data": ["525", 116, 90.625, 3.2222222222222223], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3600, 128, "525", 116, "520", 12, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 300, 19, "525", 18, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home-2", 300, 22, "525", 20, "520", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["Login", 300, 23, "525", 20, "520", 3, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout-2", 300, 19, "525", 18, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Login-2", 300, 23, "525", 20, "520", 3, "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home", 300, 22, "525", 20, "520", 2, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
