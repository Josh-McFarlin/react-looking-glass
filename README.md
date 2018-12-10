# React Looking Glass

A React component for magnifying images using a magnifying/looking glass effect.

React Looking Glass offers some advantages over other similar components:
* Simple: Only set the source of the image and an amount to zoom by, everything else is optional
* Support for all devices: Works with mouse and touch events
* Uses React listeners: I made this component because alternatives would break my modals from creating native listeners after the component was rendered
* Small: This component only relies on two dependencies, React and PropTypes, so it is only 8kB
* Simple style: Rather than passing in many different styles as props, they can easily be modified with className

You can view detailed usage examples at the [Storybook](https://joshmcfarlin.me/react-looking-glass/), or a simple example on [CodeSandbox](https://codesandbox.io/s/jvv3qx79w3).

## Usage
Install the package using NPM:
```
npm install react-looking-glass
```

Use the component:
```javascript
import LookingGlass from "react-looking-glass";
import image from "./path";

<LookingGlass src={image} zoomFactor={4} />
```

## Props
| Prop           | Type    | Default        | Required | Description                                                                                 |
|----------------|---------|:--------------:|:--------:|---------------------------------------------------------------------------------------------|
| src            | String  |                |     x    | The source of the primary image                                                             |
| zoomFactor     | Number  |        3       |     x    | The amount to zoom the image by                                                             |
| size           | Number  |       200      |          | The size of the width and height of the magnifier in pixels                                 |
| cursorOffset   | Object  | { x: 0, y: 0 } |          | The offset of the magnifier from the cursor                                                 |
| zoomSrc        | String  |                |          | An optional higher resolution photo for the magnifier                                       |
| displayZoomOne | Boolean |      false     |          | Will show the magnifier when zoomFactor is equal to 1                                       |
| scrollLinked   | Boolean |      true      |          | Will update the magnifier when the container scrolls, but this might break on some browsers |
| squareMagnifier| Boolean |      false     |          | If true, will display the magnifier as a square instead of a circle                         |
| className      | String  |                |          | The name of the class for the image holder (the root of the component)                      |
| imageClassName | String  |                |          | The name of the class for the image itself (only applies to the primary image)              |
| zoomClassName  | String  |                |          | The name of the class for the magnifying glass                                              |
