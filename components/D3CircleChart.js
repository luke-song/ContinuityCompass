import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3CircleChart = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", 500)
      .attr("height", 300);

    const data = [1, 2, 3, 4, 5, 6, 7]; // Define an array with 7 elements

    const g = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * 50 + 50},${150})`);

    g.append("circle")
      .attr("r", 35)
      .attr("fill", "white");

    g.append("text")
      .text(d => d)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "black")
      .attr("font-size", "20px");

  }, []);

  return <svg ref={ref}></svg>;
};

export default D3CircleChart;