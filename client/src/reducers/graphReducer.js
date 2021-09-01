export const graphReducer = (
    state = {
        graph: []
    },
    action
) => {
    switch (action.type) {
        case "GRAPH_DATA":
            return { employees: action.payload };
        default:
            return state;
    }
};
