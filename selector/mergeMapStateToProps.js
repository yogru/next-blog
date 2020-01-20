export default function mergeMapStateToProps(arr) {
    return function (state, ownProps) {
        return arr.reduce((acc, func) => {
            return {
                ...acc,
                ...func(state, ownProps)
            }
        }, {})
    }
}