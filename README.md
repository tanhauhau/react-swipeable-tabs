# react-swipeable-tabs

> Based on [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views)

## Customize Tab
You can set a custom `tabComponent`.
`tabComponent` should be created via `Tab` factory method:
- `Tab.text(toString: (data) => string, { sync: (ref, t, mode) => void , ...otherProps })`
- `Tab.custom(renderTab: (data) => node, sync: (ref, t, mode) => void)`

## Customize Tab Indicator
There are two ways to to customize the tabIndicator: `tabIndicatorComponent` and `tabIndicatorStyle`.

### tabIndicatorStyle   *PropTypes.object*
Pass css style object to modify the Tab Indicator style

### tabIndicatorComponent   *React.Component*
This component must implement `syncScroll(from, to, t, mode)` public method, and should call `props.onTabIndicatorTransitionEnd` to indicate the transition ends.

- `syncScroll(from, to, t, mode)`
  
  `from` and `to` is object of shape `{left: number, width: number}`. 

  `t` is between `0` and `1`.

  `mode` can be either `'end'` or `'move'`, `'move'` indicates that the user is swiping the tab, and `'end'` indicates the swiping motion has ended.

  u can do css transform to do animate the tab indicator, but be aware and stay away from [css styles that will trigger relayout or repaint](https://csstriggers.com/)

## LICENSE
MIT