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

    var data = {"OkPercent": 98.22222222222223, "KoPercent": 1.7777777777777777};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.42944444444444446, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.61, 500, 1500, "Access Home-0"], "isController": false}, {"data": [0.6883333333333334, 500, 1500, "Access Home-1"], "isController": false}, {"data": [0.18666666666666668, 500, 1500, "Logout"], "isController": false}, {"data": [0.4266666666666667, 500, 1500, "Access Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [0.49333333333333335, 500, 1500, "Login-0"], "isController": false}, {"data": [0.5616666666666666, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.64, 500, 1500, "Login-1"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.06833333333333333, 500, 1500, "Access Home"], "isController": false}, {"data": [0.7116666666666667, 500, 1500, "Logout-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3600, 64, 1.7777777777777777, 3182.8830555555596, 18, 32681, 964.5, 10625.8, 12268.75, 18407.93, 72.32691766785872, 397.22891218306745, 15.816765216277574], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Access Home-0", 300, 0, 0.0, 961.4533333333329, 18, 15812, 683.0, 1439.9000000000003, 2849.649999999999, 7336.010000000002, 16.951067917278788, 1.9367919397672053, 2.218206153237654], "isController": false}, {"data": ["Access Home-1", 300, 0, 0.0, 790.5133333333338, 43, 7449, 507.0, 1588.200000000001, 1697.0, 6660.300000000005, 18.48087229717243, 17.727620337429926, 2.183774949177601], "isController": false}, {"data": ["Logout", 300, 10, 3.3333333333333335, 2971.1399999999994, 122, 20939, 2118.5, 5666.300000000001, 7700.899999999999, 16470.88, 8.283860278889962, 91.18283924996547, 3.769803603479221], "isController": false}, {"data": ["Access Home-2", 300, 12, 4.0, 2013.696666666667, 75, 29879, 1015.5, 4969.500000000004, 5635.599999999999, 17208.090000000007, 9.23986694591598, 91.19258409241407, 1.0918202152888998], "isController": false}, {"data": ["Login", 300, 10, 3.3333333333333335, 12422.633333333328, 8995, 26858, 11568.5, 16095.400000000003, 19324.449999999986, 25475.710000000006, 10.983378487222671, 120.84494358433405, 5.3801035526653], "isController": false}, {"data": ["Login-0", 300, 0, 0.0, 875.9200000000002, 204, 2197, 742.0, 1797.6000000000029, 1888.95, 1934.95, 81.63265306122449, 9.327168367346939, 20.727040816326532], "isController": false}, {"data": ["Logout-2", 300, 10, 3.3333333333333335, 1600.1899999999996, 53, 20645, 630.0, 3734.6000000000004, 5205.2, 15660.390000000007, 8.503883440104314, 84.46739668667442, 1.0048534143092012], "isController": false}, {"data": ["Login-1", 300, 0, 0.0, 687.3666666666668, 119, 2108, 646.0, 1044.8000000000004, 1184.5999999999997, 1926.7200000000003, 78.92659826361484, 75.31067071165482, 9.326287490134176], "isController": false}, {"data": ["Logout-1", 300, 0, 0.0, 633.996666666667, 34, 6764, 340.5, 1624.3000000000002, 2051.549999999999, 3384.9900000000016, 9.574569942233428, 9.193768849934575, 1.1313700810646923], "isController": false}, {"data": ["Login-2", 300, 10, 3.3333333333333335, 10734.916666666664, 6716, 25105, 9916.0, 14676.900000000005, 18022.74999999998, 24033.960000000003, 11.383471199817864, 113.08437375493284, 1.3406334783144873], "isController": false}, {"data": ["Access Home", 300, 12, 4.0, 3766.0300000000007, 580, 32681, 2830.0, 7347.400000000005, 8989.6, 18394.760000000006, 8.714343809911114, 95.36079198861326, 3.1997981177017367], "isController": false}, {"data": ["Logout-0", 300, 0, 0.0, 736.7399999999993, 21, 9093, 449.5, 1539.3000000000002, 2021.2999999999997, 5689.530000000007, 9.446438692612885, 1.0793294209333082, 2.0664084640090685], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 2, 3.125, 0.05555555555555555], "isController": false}, {"data": ["525", 62, 96.875, 1.7222222222222223], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3600, 64, "525", 62, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 2, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 300, 10, "525", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home-2", 300, 12, "525", 12, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Login", 300, 10, "525", 9, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout-2", 300, 10, "525", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Login-2", 300, 10, "525", 9, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: mercusuar.uzone.id:443 failed to respond", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home", 300, 12, "525", 12, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
