import { onMount } from "solid-js";
import * as d3 from "d3";
import { D3ForceGraph } from 'd3-force-graph';
import { Box } from "@suid/material";

const ForceGraphComponent = () => {
  let containerRef;

  onMount(() => {
    const data = {
      nodes: [{ id: 'Node1' }, { id: 'Node2' }, { id: 'Node3' }, { id: 'Node4' }, { id: 'Node5' }, { id: 'Node6' }],
      links: [
        { source: 'Node1', target: 'Node2' },
        { source: 'Node2', target: 'Node3' },
        { source: 'Node3', target: 'Node4' },
        { source: 'Node4', target: 'Node5' },
        { source: 'Node5', target: 'Node6' },
        { source: 'Node6', target: 'Node1' }
      ]
    };

    const graph = new D3ForceGraph(containerRef, data, {
      width: 600,
      height: 400,
    });
    
    // Optionally, add event listeners or further customization here
    graph.events.on('tick', () => console.log('Tick event'));
  });

  return <div ref={containerRef}></div>;
};

const NetworkGraph = () => {
  let svgRef;

  onMount(() => {
    const width = 600;
    const height = 400;
    const nodes = [{ id: "A" }, { id: "B" }, { id: "C" }];
    const links = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
    ];

    const svg = d3.select(svgRef)
      .attr("width", width)
      .attr("height", height);

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", "blue");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });
  });

  return <svg ref={svgRef}></svg>;
};

const Network = () => {
  return (
    <Box>
      <ForceGraphComponent />
      <NetworkGraph />
    </Box>
);
}

export default Network;
