import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export default function Chart({ data = [] }) {
    const chart = React.useRef(null);


    React.useEffect(() => {
        chart.current = am4core.create("chartdiv", am4charts.XYChart)
        chart.current.data = data;

        let dateAxis = chart.current.xAxes.push(new am4charts.ValueAxis());
        dateAxis.renderer.minGridDistance = 30;

        // Create series
        let series = chart.current.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "y";
        series.dataFields.valueX = "x";
        series.tooltipText = "{y}"

        series.tooltip.pointerOrientation = "vertical";

        chart.current.cursor = new am4charts.XYCursor();
        chart.current.cursor.snapToSeries = series;
        chart.current.cursor.xAxis = dateAxis;


    }, [data])

    return <div style={{ width: '100%', height: '100%' }} >
        <div id='chartdiv' style={{ width: '100%', height: '100%' }}></div>
    </div>

}
