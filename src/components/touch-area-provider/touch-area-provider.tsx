import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import type {
  TouchOutsideHandler,
  TouchOutsideCallback,
} from "../../../types/touch-outside.types";

import { TouchOutsideContext } from "../../context/touch-outside.context";

export const TouchAreaProvider: React.FC = ({ children }) => {
  const [handlers, setHandlers] = useState<TouchOutsideHandler[]>([]);

  function addHandler(
    id: string,
    childrenTags: string[],
    callback: TouchOutsideCallback
  ): void {
    setHandlers((prevState) => {
      const existingHandlerIndex = prevState.findIndex(
        (handler) => handler.id === id
      );

      if (existingHandlerIndex === -1) {
        return [...prevState, { id, childrenTags, callback }];
      }

      return prevState;
    });
  }

  function removeHandler(id: string): void {
    setHandlers((currentValue) => [
      ...currentValue.filter((handler) => handler.id !== id),
    ]);
  }

  function handleResponderTouchCapture(event: GestureResponderEvent): boolean {
    event.persist();

    for (const handler of handlers) {
      if (!handler.childrenTags.includes(event.nativeEvent.target)) {
        if (handler.callback) {
          handler.callback(handler.id);
        } else {
          console.warn(`Handler for "${handler.id}" has no callback.`);
        }
      }
    }

    return false;
  }

  return (
    <TouchOutsideContext.Provider
      value={{
        handlers,
        addHandler,
        removeHandler,
      }}
    >
      <View
        onStartShouldSetResponder={handleResponderTouchCapture}
        onStartShouldSetResponderCapture={handleResponderTouchCapture}
        style={touchAreaViewStyles.root}
      >
        {children}
      </View>
    </TouchOutsideContext.Provider>
  );
};

const touchAreaViewStyles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
});
