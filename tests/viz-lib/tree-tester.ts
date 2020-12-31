import { createTree } from "../../src/viz-lib/tree"
import * as fs from "fs"

function testCreateTree() {
    let passed: boolean = true;
    let inputFiles = ['./tree-tester-input-1.json'];
    for (let fileName of inputFiles) {
        let fileContent: string;
        try {
            fileContent = fs.readFileSync(fileName, 'utf8');
        }
        catch (e) {
            console.log(`Error: failed to read file ${fileName}, with error info ${e.message}`);
            passed = false;
        }
        
        let treeObj = createTree(fileContent);
        if (treeObj) {
            console.log(`Check: createTree returns: ${JSON.stringify(treeObj)}`);
        }
        else {
            console.log("Error: treeObj undefined.");
            passed = false;
        }
    }
    console.log(`testCreateTree() ${passed ? "passed" : "failed"}`);
}

function testCreateTreeNegative() {
    let passed: boolean = true;
    let inputFiles = ['./tree-tester-negative-1.json'];
    for (let fileName of inputFiles) {
        let fileContent: string;
        try {
            fileContent = fs.readFileSync(fileName, 'utf8');
        }
        catch (e) {
            console.log(`Error: failed to read file ${fileName}, with error info ${e.message}`);
            passed = false;
        }

        let treeObj = createTree(fileContent);
        if (treeObj) {
            console.log(`Error: createTree returns: ${JSON.stringify(treeObj)}`);
            passed = false;
        }
    }
    console.log(`testCreateTreeNegative() ${passed ? "passed" : "failed"}`);
}

testCreateTree();
testCreateTreeNegative();