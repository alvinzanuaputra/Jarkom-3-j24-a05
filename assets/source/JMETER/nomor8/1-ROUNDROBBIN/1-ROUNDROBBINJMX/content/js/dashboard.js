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

    var data = {"OkPercent": 95.44444444444444, "KoPercent": 4.555555555555555};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.37666666666666665, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.585, 500, 1500, "Access Home-0"], "isController": false}, {"data": [0.6116666666666667, 500, 1500, "Access Home-1"], "isController": false}, {"data": [0.155, 500, 1500, "Logout"], "isController": false}, {"data": [0.375, 500, 1500, "Access Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [0.38666666666666666, 500, 1500, "Login-0"], "isController": false}, {"data": [0.5083333333333333, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.25, 500, 1500, "Login-1"], "isController": false}, {"data": [0.8216666666666667, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.025, 500, 1500, "Access Home"], "isController": false}, {"data": [0.8016666666666666, 500, 1500, "Logout-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3600, 164, 4.555555555555555, 4477.073055555562, 17, 44143, 1325.5, 16826.7, 18780.799999999996, 24249.53999999999, 70.4184026758993, 369.6448852522348, 15.330061811709017], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Access Home-0", 300, 0, 0.0, 766.9133333333335, 23, 4700, 667.5, 1355.0, 1572.0499999999997, 3289.400000000006, 10.680337498664958, 1.2203119993591798, 1.3976222898643598], "isController": false}, {"data": ["Access Home-1", 300, 0, 0.0, 1003.7566666666672, 37, 8746, 543.0, 2864.6000000000035, 3463.6499999999983, 8190.9400000000005, 10.99545521184577, 10.542966459280164, 1.2992676568684944], "isController": false}, {"data": ["Logout", 300, 24, 8.0, 3000.843333333334, 147, 19014, 2136.5, 5876.300000000001, 6368.449999999999, 17139.990000000013, 9.732675837010122, 102.88740485295548, 4.429127871139372], "isController": false}, {"data": ["Access Home-2", 300, 23, 7.666666666666667, 2589.140000000001, 87, 17121, 1047.5, 5675.9000000000015, 7427.449999999999, 16367.390000000001, 10.931351114997813, 104.14570779359788, 1.2916928563620464], "isController": false}, {"data": ["Login", 300, 35, 11.666666666666666, 19538.96666666667, 15255, 44143, 18446.0, 23564.00000000002, 26001.75, 33295.36, 6.522448092183933, 67.33710016034352, 3.156423252527449], "isController": false}, {"data": ["Login-0", 300, 0, 0.0, 1143.7500000000005, 518, 3560, 1159.5, 1601.0, 1628.9, 2520.750000000001, 69.91377301328362, 7.988194768119318, 17.751543929154042], "isController": false}, {"data": ["Logout-2", 300, 24, 8.0, 1763.4933333333333, 67, 18263, 789.0, 4986.900000000002, 5295.95, 15753.490000000009, 10.015022533800702, 95.11422081038225, 1.1834157486229344], "isController": false}, {"data": ["Login-1", 300, 0, 0.0, 1738.2466666666674, 395, 2882, 1526.5, 2717.0, 2787.0, 2879.98, 87.15862870424172, 83.16385822196398, 10.299017649622312], "isController": false}, {"data": ["Logout-1", 300, 0, 0.0, 701.6800000000006, 34, 5218, 354.0, 1651.9000000000021, 3212.899999999999, 5001.8800000000065, 11.2145340361108, 10.765113044839445, 1.3251549007513737], "isController": false}, {"data": ["Login-2", 300, 35, 11.666666666666666, 16578.896666666667, 12799, 42709, 15546.0, 20312.300000000003, 23103.299999999996, 30164.83, 6.928406466512702, 64.12569464491918, 0.7750252598152425], "isController": false}, {"data": ["Access Home", 300, 23, 7.666666666666667, 4363.65, 311, 24250, 2956.0, 7978.400000000001, 10778.599999999995, 17903.98, 10.41630498941009, 110.4165287772126, 3.8247369882990174], "isController": false}, {"data": ["Logout-0", 300, 0, 0.0, 535.5400000000001, 17, 3171, 445.5, 998.8000000000008, 1202.4499999999998, 2117.4600000000005, 11.039558417663294, 1.2613557957681691, 2.4149034038638453], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 18, 10.975609756097562, 0.5], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 14, 8.536585365853659, 0.3888888888888889], "isController": false}, {"data": ["525", 132, 80.48780487804878, 3.6666666666666665], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3600, 164, "525", 132, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 18, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 14, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 300, 24, "525", 24, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home-2", 300, 23, "525", 23, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Login", 300, 35, "525", 19, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 7, "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout-2", 300, 24, "525", 24, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Login-2", 300, 35, "525", 19, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 7, "", "", "", ""], "isController": false}, {"data": ["Access Home", 300, 23, "525", 23, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
