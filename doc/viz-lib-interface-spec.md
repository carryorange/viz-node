# Visualization Specification Design

## Design Requirements
* See [viz-node-design-doc.md](viz-node-design-doc.md)

## Design Considerations
* Format: JSON
  * Alternative 1: DOT
    * Pros:
      1. Easy to visualize
      2. No new format required
    * Cons:
      1. Users will need to provide a well-defined DOT file
      2. Less flexible if additional processing is needed (need to parse DOT files in the library)
* Create a new format specification
  * Alternative 2: Use an existing JSON format such as [Netflix Falcor](Visualization_specficiation)
    * Pros:
      1. No need to reinvent a new format
      2. Can take advantage of existing library
    * Cons:
      1. Less control
      2. Additional efforts to understand and extend the library

## Design details
* The interface is defined by `VizIF` class in [graph-spec.ts](../viz-lib/../src/viz-lib/graph-spec.ts)