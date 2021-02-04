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
