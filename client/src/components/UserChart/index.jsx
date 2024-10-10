import React, { useRef, useEffect, useState } from "react";
import './index.css';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear, max, min } from "d3";

const UserChart = ({
    user,
}) => {
    const [data, setData] = useState([user.weightTrack]);
    const svgRef = useRef();
    useEffect(() => {
        const svg = select(svgRef.current);

        const xScale = scaleLinear()
            .domain(data.map( (d) => d.recordedAt ))
            .range([0, 300]);

        const yScale = scaleLinear()
            .domain(data.map( (d) => d.recordedWeight))
            .range([150, 0]);

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(index => index + 1);
        svg
            .select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis);

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis);

        const myLine = line()
            .x((data) => xScale(data.recordedAt))
            .y((data)=>yScale(data.recordedWeight))
            .curve(curveCardinal);

        svg
            .selectAll("path")
            .data(data)
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "red");
    }, [data]);

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default UserChart;