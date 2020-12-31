// {file:partial:impl[SpecReq1]}
export abstract class IBinaryTreeNode {
    label: string;
    left?: IBinaryTreeNode;
    right?: IBinaryTreeNode;
}

export abstract class ITree {
    constructor(root: IBinaryTreeNode) {
        this.root = root;
    }
    root: IBinaryTreeNode; // TODO: support general tree struct
}

export abstract class IGraph {
    type: "digraph" | "undigraph"
}

export abstract class IViz {
    
}