# React Native Touch Outside

Utility library to handle outside touches in React Native

## Installation

Installing touch-outside only takes a single command and you're ready to roll:

```
# with npm
npm install --save react-native-touch-outside

# with yarn
yarn add react-native-touch-outside
```

## Usage

Wrap the `TouchAreaProvider` on the root of your app.

### TouchAreaProvider

```jsx
<TouchAreaProvider>
  <Screen />
</TouchAreaProvider>
```

### touchOutside

A wrapper around any `View`-based component that registers the component for `touchOutside` events.

```jsx
import { touchOutside } from "react-native-touch-outside";

const TouchOutsideView = touchOutside(View);

export const ExampleComponent = () => {
  function handleTouchOutside(id: string) {
    console.log("Pressed outside!");
  }

  return <TouchOutsideView onTouchOutside={handleTouchOutside} />;
};
```

### TouchOutsideView

A convenience `View` component that registers the component for `touchOutside` events.

```jsx
import { TouchOutsideView } from "react-native-touch-outside";

export const ExampleComponent = () => {
  function handleTouchOutside(id: string) {
    console.log("Pressed outside!");
  }

  return <TouchOutsideView onTouchOutside={handleTouchOutside} />;
};
```

### TouchOutsidePressable

A convenience `Pressable` component that registers the component for `touchOutside` events.

```jsx
import { TouchOutsidePressable } from "react-native-touch-outside";

export const ExampleComponent = () => {
  function handleTouchOutside(id: string) {
    console.log("Pressed outside!");
  }

  return <TouchOutsidePressable onTouchOutside={handleTouchOutside} />;
};
```
