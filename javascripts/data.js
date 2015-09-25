
export var ExperimentsData = [
    {type: 'algorithm', title: "Printing a tree",  pathname: "tree_print"}
];

export var ExperimentsStyle = {
    "tree_print": {
        src: "/experiments/tree_print.html",
        wrapperCss: {height: "500px", width: "100%"},
        title: "Tree Print",
        description: ("To properly print a tree, we must adjust the position of each node as the tree growth to avoid collisions. " +
        "This divides the space by number of children. (TODO: use the right/left most children of a subtree to measure the width instead " +
        "of using just the children.")
    }
};