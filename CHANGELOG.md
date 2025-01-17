# 5.3.2 - 1/17/25
- [chore] upgrade framer-motion to motion
- [chore] upgrade reablocks

# 5.3.1 - 7/11/24
- [improvement] Update pan drag cursor #260

# 5.3.0 - 7/11/24
- [feature] Add fit to node canvas util and related improvements (#258)
- [improvement] Improve scroll consistency on different devices (#259)
- [chore] Upgrade deps (#257)
- [feature] Add drag pan type (#256)
- [docs] Update README.md
  
# 5.2.12 - 4/30/24
- [fix] Update reakeys + reablocks

# 5.2.11 - 4/22/24
- [fix] Update reablocks

# 5.2.10 - 4/14/24
- [chore] migrate from rdk to reablocks

# 5.2.9 - 2/28/24
- [chore] upgrade deps

# 5.2.8 - 12/15/23
- [chore] upgrade rdk

# 5.2.7 - 11/13/23
- [improvement] center horizontal edge labels
- [fix] fix elk.bundled webpack error

# 5.2.6 - 8/25/22
- [fix] fix node title showing when no content to show

# 5.2.5 - 8/23/22
- [fix] calculateSize fn #231

# 5.2.4 - 8/22/23
- [fix] Attempt to fix webpack error issue

# 5.2.3 - 8/21/23
- [fix] Fix webpack error #229

# 5.2.2 - 7/27/23
- [fix] fix node ordering bug
- [chore] upgrade deps

# 5.2.1 - 6/14/23
- [chore] improve exports

# 5.2.0 - 5/2/23
- [chore] update build

# 5.1.2 - 1/9/23
- [fix] update useProximity getCoords call #199

# 5.1.1 - 12/2/22
- [fix] Fix getCoords when non-center position is used #179

# 5.1.0 - 11/21/22
- [chore] upgrade deps

# 5.0.7 - 9/19/22
- [improvement] Feature/expose useScrollXY function #180
- [chore] bump elkjs #181

# 5.0.6 - 6/10/22
- [improvement] Added interpolation props to Edge #166

# 5.0.5 - 5/10/22
- [chore] bump rdk

# 5.0.4
- [fix] Change center and centerCanvas to defaultPosition and positionCanvas for more flexible placement options #154

# 5.0.3 - 4/6/22
- [chore] bump rdk

# 5.0.2 - 4/5/22
- [chore] fix framer-motion

# 5.0.1 - 4/4/22
- [fix] Edge labels extra data #151

# 5.0.0 - 4/4/22
- [chore] upgrade react
- [chore] upgrade framer-motion

# 4.2.17 - 3/31/22
- [fix] Fixes missing data in nested edges #150

# 4.2.16 - 3/30/22
- [fix] Fix data attribute in edge #149

# 4.2.16 - 2/3/22
- [fix] improve edge custom styling #143

# 4.2.15 - 12/28/21
- [fix] Pass children to edge cloned element #136

# 4.2.14 - 12/6/21
- [fix] Improve performance and add memorization #130

# 4.2.13 - 12/2/21
- [fix] fix unnecessary re-renders #127

# 4.2.12 - 11/23/21
- [fix] Pass Node ref to event at srcElement prop #125

# 4.2.11 - 11/1/21
- [fix] fix useUndo functions(count, history, clear) #117

# 4.2.10 - 10/27/21
- [fix] Fix crash on undefined Edge properties #116

# 4.2.9 - 10/25/21
- [enhancement] add more control for nodes and edges #113

# 4.2.8 - 10/20/21
- [fix] prevent parent events on disabled entities #112

# 4.2.7 - 10/20/21
- [fix] #109 css not rule applied to multiple classes

# 4.2.6 - 9/27/21
- [fix] #105 handle nested nested

# 4.2.5 - 9/22/21
- [chore] upgrade rdk for ghost dom issues

# 4.2.4 - 9/21/21
- [chore] upgrade rdk for ghost dom issues

# 4.2.3 - 9/21/21
- [chore] upgrade deps

# 4.2.2 - 9/8/21
- [chore] upgrade deps

# 4.2.1 - 8/23/21
- [chore] upgrade reakeys

# 4.2.0 - 8/23/21
- [feature] add ability to disable hotkeys

# 4.1.2 - 7/27/21
- [fix] remove unneeded dependency 

# 4.1.1 - 7/27/21
- [fix] fix drag node edge callback

# 4.1.0 - 7/26/21
- [feature] Update drag re-arrange to support nested items

# 4.0.0 - 7/23/21
- [BREAKING] `onNodeLink` and `onNodeLinkCheck` now pass `event` as the first argument!
- [feature] Improve drag DX
- [fix] fix port not getting drag cursor

# 3.3.4 - 7/23/21
- [fix] improve safety check for node linking

# 3.3.3 - 7/23/21
- [fix] fix height null errors

# 3.3.2 - 7/22/21
- [fix] reorder port position for drag node to be on top
- [fix] fix height / width in drag node being lost

# 3.3.1 - 7/22/21
- [feature] remove hardcoded height/width for dynamic cloning

# 3.3.0 - 7/22/21
- [feature] Node now has `dragType` which indicates if u can drag a node from the port, node, or port when multi-node only.
- [feature] new helper function: `getEdgesByNode`
- [feature] added demo for node + port dragging
- [feature] added `dragCursor` for custom cursors on node dragging

# 3.2.0 - 7/21/21
- [feature] ability to drag nodes to different positions
- [feature] new helper functions: `removeEdgesFromNode` and `createEdgeFromNodes`

# 3.1.4 - 7/9/21
- [chore] upgrade rdk

# 3.1.3 - 6/9/21
- [chore] upgrade rdk
- [chore] fix elk bundling issue

# 3.1.2 - 5/14/21
- [bug] fix positioning of ports relative to edges

# 3.1.1 - 4/19/21
- [feature] add `animated` property to disable animations

# 3.1.0 - 4/16/21
- [chore] upgrade rdk/realayers/deps

# 3.0.14 - 3/7/21
- [feature] Add `children` property to Edges/Port components #76

# 3.0.13 - 2/11/21
- [fix] fix disabled css overrides not correct in node

# 3.0.12 - 2/11/21
- [fix] fix disabled css overrides not correct in edge

# 3.0.11 - 2/11/21
- [fix] fix disabled css overrides not correct

# 3.0.10 - 2/10/21
- [feature] add ability to disable port events
- [fix] make port cursor a crosshair rather than pointer

# 3.0.9 - 2/10/21
- [feature] add `selectionDisabled` to `NodeData` and `EdgeData`
- [fix] fix `disabled` not passing through to nodes and edges

# 3.0.8 - 2/10/21
- [feature] add `layoutOptions` to `NodeData` model
- [chore] improve docs

# 3.0.7 - 2/9/21
- [fix] fix edge overrender issues

# 3.0.6 - 2/9/21
- [fix] fix edge overrender issues

# 3.0.5 - 2/4/21
- [fix] fix typo w/ null coll

# 3.0.4 - 2/4/21
- [feature] add disabled to select helper
- [perf] improve node render perf
- [perf] improve proximity perf
- [perf] improve undo perf

# 3.0.3 - 2/4/21
- [fix] reverting react-use-gesture update

# 3.0.2 - 2/4/21
- [feature] add ability to disable proximity

# 3.0.1 - 2/4/21
- [feature] add ability to disable undo/redo

# 3.0.0 - 2/4/21
- [breaking] `useProximity` no longer returns `distance`, instead use `onDistanceChange`
- [feature] add `onIntersection` to `useProximity`
- [feature] add `intersectNodeId` to `useProximity`
- [feature] performance improvements for `useProximity`

# 2.7.0 - 2/3/21
- [fix] fix proximity drop with nesting
- [fix] fix proximity not handling all edges
- [fix] fix addNodeAndEdge not accounting for parent
- [chore] upgrade deps
- [chore] tweak peer dep for framer-motion

# 2.6.4 - 1/25/21
- [Fix] Fix upsert node function #38
- [Fix] Fix wrong import #39

# 2.6.3 - 12/29/20
- [Fix] Fix children interface

# 2.6.2 - 12/29/20
- [Fix] Pass down nodes/edges to children callback

# 2.6.1 - 12/29/20
- [Fix] Remove foreign objects being default children

# 2.6.0 - 12/29/20
- [Feature] Add proximity hook
- [Feature] Expand canvas ref options
- [Fix] Can't link nodes who aren't parents
- [Fix] Layout null ref exception
- [Chore] Folder reorg for utils
- [Chore] Folder reorg for docs
- [Chore] Replace `transformation-matrix` with `kld-affine`
- [Chore] Various type improvements

# 2.5.5 - 12/28/20
- [Fix] Improve `useUndo` types

# 2.5.5 - 12/28/20
- [Feature] Add `clear` to `useUndo` hook

# 2.5.3/4 - 12/18/20
- [Chore] Update deps
- [Chore] cleanup deps

# 2.5.2 - 12/17/20
- [Chore] Remove scss
- [Chore] Update rdk

# 2.5.1 - 12/17/20
- [Feature] Improve Can Redo Hook Event Args

# 2.5.0 - 12/17/20
- [Feature] Undo Redo Hook

# 2.4.5 - 12/16/20
- [Feature] Add adjustable padding for nested nodes and add storybook story for custom nested nodes #30
