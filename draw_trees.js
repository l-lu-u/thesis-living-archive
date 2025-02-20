function drawTrees(trees) {
    const treesGallery = d3.select("body").append("div").attr("id","trees").style("transform","")
    
    // treesGallery.append("div").attr("id","show")
    // .on("click",function(){
    //     d3.selectAll(".treeCanvas").style("display","block")
    // })
    
    treesGallery.append("div").attr("id","control")
    .on("click",function(){
        const control = d3.select(this);
        const panel = d3.select(this.parentNode);
        const isExpanded = control.classed("expanded");
        const currentTransform = panel.style("transform");
        panel.style("transform", isExpanded ? "" : "translate(0px,110px)");
        control.classed("expanded", !isExpanded);
    })
    trees.forEach(tree => {
        
        const canvas = treesGallery.append("svg").classed("treeCanvas",true)
        const edgesLayer = canvas.append("g").attr("id","edges")
        const nodesLayer = canvas.append("g").attr("id","nodes")
        const root = d3.hierarchy(tree)
        const treeLayout = d3.tree()
        treeLayout.size([100,100])
        treeLayout(root)
        const nodes = nodesLayer.selectAll(".node")
            .data(root.descendants())
            .join("g")
            .classed("node",true)
            .attr("transform",d=>`translate(${d.x},${d.y+10})`)
            .on("click",function(e,d){
                console.log(d)
                d3.selectAll(".treeCanvas").each(function(){
                    const sharingNode = d3.select(this).selectAll(".node").data().map(n=>n.data.name);
                    d3.select(this).style("display",sharingNode.includes(d.data.name)?"block":"none")
                })
            })
        nodes
            .append("circle")
            .attr("r",2)
            .attr("fill", "teal")
            
        nodes.append("text")
            .attr("y",8)
            .text(d=>d.data.name)
            .attr("fill", "teal")
        const edges = edgesLayer.selectAll(".edge")
            .data(root.links())
            .join("g")
            .classed("edge",true)

        edges.append("line")
            .attr("x1", d=> d.source.x)
            .attr("x2", d=> d.target.x)
            .attr("y1", d=> d.source.y+10)
            .attr("y2", d=> d.target.y+10)
    });
    
}