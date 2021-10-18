# React Native Touch Outside

Utility library to handle outside touches in React Native

## Installation

`yarn add react-native-touch-outside`

## Usage

Wrap the TouchAreaProvider on the root of your app.

### Root component

```jsx
<TouchAreaProvider>
  <Screen />
</TouchAreaProvider>
```

### Child component

```jsx
export const ExampleComponent = () => {
  const [nativeTag, setNativeTag] = useState();
  const { addListener, removeListener } = useTouchOutside();

  function onPressOutside(id: string) {
    console.log("Pressed outside!");
  }

  function handleLayout(e: LayoutChangeEvent) {
    setNativeTag(e.target._nativeTag);

    // Register a callback to this native tag.
    addListener(e.target._nativeTag, onPressOutside);
  }

  return (
    <Pressable
      // Use onLayout to get the native tag
      onLayout={handleLayout}
      onPress={handlePress}
      style={{
        width: 100,
        height: 100,
      }}
    />
  );
};
```
