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

    var data = {"OkPercent": 95.41284403669725, "KoPercent": 4.587155963302752};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.32527105921601335, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.4666666666666667, 500, 1500, "Access Home-0"], "isController": false}, {"data": [0.565, 500, 1500, "Access Home-1"], "isController": false}, {"data": [0.06, 500, 1500, "Logout"], "isController": false}, {"data": [0.29, 500, 1500, "Access Home-2"], "isController": false}, {"data": [0.0, 500, 1500, "Login"], "isController": false}, {"data": [0.46166666666666667, 500, 1500, "Login-0"], "isController": false}, {"data": [0.41471571906354515, 500, 1500, "Logout-2"], "isController": false}, {"data": [0.365, 500, 1500, "Login-1"], "isController": false}, {"data": [0.7107023411371237, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.0, 500, 1500, "Login-2"], "isController": false}, {"data": [0.006666666666666667, 500, 1500, "Access Home"], "isController": false}, {"data": [0.5652173913043478, 500, 1500, "Logout-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3597, 165, 4.587155963302752, 4224.217959410614, 3, 92471, 1421.0, 13907.600000000002, 15853.299999999996, 21678.519999999997, 33.243992606284664, 173.8832800225277, 7.269776744454713], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Access Home-0", 300, 0, 0.0, 1214.4099999999994, 18, 8806, 1003.5, 2132.6000000000004, 2263.45, 7936.230000000001, 9.592326139088728, 1.095998201438849, 1.2552458033573142], "isController": false}, {"data": ["Access Home-1", 300, 0, 0.0, 1055.1300000000008, 37, 14246, 639.5, 2330.3, 2771.2, 3947.7000000000003, 9.94266397109999, 9.53712497514334, 1.1748655668975574], "isController": false}, {"data": ["Logout", 300, 25, 8.333333333333334, 3928.529999999999, 3, 35015, 2910.0, 6267.900000000001, 8119.649999999997, 21839.32000000001, 3.259629488781442, 34.36146065355572, 1.4784414556962027], "isController": false}, {"data": ["Access Home-2", 300, 27, 9.0, 3105.113333333335, 196, 90184, 1697.5, 5840.100000000001, 7518.349999999998, 15970.290000000003, 3.2499891667027776, 30.55718736796919, 0.3840319230185899], "isController": false}, {"data": ["Login", 300, 31, 10.333333333333334, 16027.803333333326, 12317, 45084, 14794.0, 19329.600000000002, 22504.749999999993, 34084.99000000001, 6.643929662931302, 68.72357999844975, 3.257082705851087], "isController": false}, {"data": ["Login-0", 300, 0, 0.0, 1033.9433333333338, 491, 3334, 938.0, 1412.8000000000002, 1864.6499999999994, 2420.95, 75.642965204236, 8.642799735249621, 19.20622163388805], "isController": false}, {"data": ["Logout-2", 299, 24, 8.02675585284281, 2223.1003344481605, 131, 34695, 848.0, 5114.0, 6878.0, 19936.0, 6.916813176644768, 65.67075575292634, 0.8173187445058758], "isController": false}, {"data": ["Login-1", 300, 0, 0.0, 1084.1733333333334, 186, 2265, 765.0, 1955.9, 2213.95, 2257.8500000000004, 88.96797153024912, 84.9296596975089, 10.512816948398576], "isController": false}, {"data": ["Logout-1", 299, 0, 0.0, 697.8093645484943, 36, 4513, 489.0, 1406.0, 1897.0, 4297.0, 8.916855540975785, 8.559541771665872, 1.053651875447334], "isController": false}, {"data": ["Login-2", 300, 31, 10.333333333333334, 13895.846666666665, 9927, 42074, 12666.5, 17444.600000000002, 20034.3, 32299.280000000013, 6.917223887479825, 64.1568912842979, 0.817367275766659], "isController": false}, {"data": ["Access Home", 300, 27, 9.0, 5375.03, 1005, 92471, 4764.0, 7984.500000000001, 10523.3, 19662.830000000013, 3.181336161187699, 33.32676423316543, 1.168146871686108], "isController": false}, {"data": ["Logout-0", 299, 0, 0.0, 1020.6220735785954, 18, 15273, 617.0, 2095.0, 2461.0, 4582.0, 8.767300023457658, 1.0017325222114708, 1.9178468801313628], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["520", 16, 9.696969696969697, 0.4448151237142063], "isController": false}, {"data": ["525", 148, 89.6969696969697, 4.114539894356408], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, 0.6060606060606061, 0.027800945232137893], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3597, 165, "525", 148, "520", 16, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 300, 25, "525", 21, "520", 3, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: gryffindor.hogwarts.a05.com: Temporary failure in name resolution", 1, "", "", "", ""], "isController": false}, {"data": ["Access Home-2", 300, 27, "525", 23, "520", 4, "", "", "", "", "", ""], "isController": false}, {"data": ["Login", 300, 31, "525", 30, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout-2", 299, 24, "525", 21, "520", 3, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Login-2", 300, 31, "525", 30, "520", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Access Home", 300, 27, "525", 23, "520", 4, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
