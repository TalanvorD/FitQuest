import React, { useRef, useEffect, useState } from "react";
import './index.css';
import { select, line, curveCardinal } from "d3";

const UserChart = ({
    user,
}) => {
    const userWeightValues = user.weightTrack.map;
    console.log(user.weightTrack);
    console.log(userWeightValues);
    const [data, setData] = useState([25,30,45,60,20,65,75]);
    const svgRef = useRef();
    useEffect(() => {
        const svg = select(svgRef.current);

        const myLine = line()
            .x((value, index) => index * 50)
            .y(value => 150 - value)
            .curve(curveCardinal);

        svg
            .selectAll("path")
            .data([data])
            .join("path")
            .attr("d", value => myLine(value))
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