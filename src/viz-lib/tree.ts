import { IBinaryTreeNode, ITree } from "./graph-spec"

export function isBinaryTreeNode(treeNode: any): boolean {
    if (!("label" in treeNode)) {
        return false;
    }

    if ((typeof treeNode["label"]) !== "string") {
        return false;
    }

    if ("left" in treeNode) {
        return isBinaryTreeNode(treeNode["left"]);
    }

    if ("right" in treeNode) {
        return isBinaryTreeNode(treeNode["right"]);
    }

    return true;
}

export function isTree(treeObj: any): boolean {
    if (!("root" in treeObj)) {
        return false;
    }

    return isBinaryTreeNode(treeObj["root"]);
}

export function createTree(treeJSON: string): ITree {
    let treeObj: object;
    try {
        treeObj = JSON.parse(treeJSON);
    }
    catch(e) {
        console.log('Syntax error when parsing tree spec JSON');
        return;
    }
    
    if (isTree(treeObj)) {
        return treeObj as ITree;
    }
    else {
        return;
    }
}

