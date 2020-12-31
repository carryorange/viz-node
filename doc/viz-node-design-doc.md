# Project viz-node Design

## Project Goals
Provide a visualization library for visualizing hierarchical data structures (e.g. trees) and graphical data structures. This includes:
* Static visualization
  1. Interfaces that allow users to specify their intended visualization [ProjectGoal1]
  2. A library that converts the specification to SVGs {[ProjectGoal2]}
  3. A web service that allows users to visualize their specification through RESTful APIs and displays it as a web page {[ProjectGoal3]}
* Animation
  1. Interfaces that allow users to specify a series of transforms of a data structure {[ProjectGoal4]}
  2. A web service that visualizes such transforms in a web page {[ProjectGoal5]}

## Architectural Design

### External Interfaces
#### Visualization specficiation
* Requirements {[ExternalInterface1]->[ProjectGoal1]}
  * Minimal
    * Graph/tree node and node relations {[SpecReq1]->[ExternalInterface1]}
  * Additional
    * Node attributes {[SpecReq2]->[ExternalInterface1]}
    * Layout guidance {[SpecReq3]->[ExternalInterface1]}
* Design details
  * See [viz-lib-interface-spec](viz-lib-interface-spec.md)

* Design considerations
  * Existing interface or new interface
    * New interface to allow flexibility in this particular use case
    * Adopt JSON format to allow easy conversion

#### RESTful API design