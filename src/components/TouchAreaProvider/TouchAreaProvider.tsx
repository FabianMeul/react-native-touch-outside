import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import type {
  ChildHandler,
  ChildHandlerCallback,
} from "../../../types/touchOutside.types";

import { TouchOutsideContext } from "../../context/TouchOutsideContext";
import { TouchAreaProviderProps } from "./TouchAreaProvider.props";

export const TouchAreaProvider = ({ children }: TouchAreaProviderProps) => {
  const [childHandlers, setChildHandlers] = useState<ChildHandler[]>([]);

  function addChildHandler(id: string, callback: ChildHandlerCallback): void {
    setChildHandlers((prevState) => {
      const existingHandlerIndex = prevState.findIndex(
        (childHandler) => childHandler.id === id
      );

      if (existingHandlerIndex === -1) {
        return [...prevState, { id, callback }];
      }

      return prevState;
    });
  }

  function removeChildHandler(id: string): void {
    setChildHandlers((currentValue) => [
      ...currentValue.filter((childHandler) => childHandler.id !== id),
    ]);
  }

  function handleResponderTouchCapture(event: GestureResponderEvent): boolean {
    event.persist();

    for (const childHandler of childHandlers) {
      if (event.nativeEvent.target !== childHandler.id) {
        childHandler.callback(childHandler.id);
      }
    }

    return false;
  }

  return (
    <TouchOutsideContext.Provider
      value={{
        childHandlers,
        addChildHandler,
        removeChildHandler,
      }}
    >
      <View
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
