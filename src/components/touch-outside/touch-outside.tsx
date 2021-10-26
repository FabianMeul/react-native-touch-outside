import { path } from "ramda";
import React, { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  View,
  ViewProps,
} from "react-native";

import { useTouchOutside } from "../../hooks/use-touch-outside.hook";
import { getTargetChildren } from "../../utils/get-target-children";
import { TouchOutsideProps } from "./touch-outside.props";

export function touchOutside<P = {}>(
  Tag: React.ComponentType<P>
): React.FunctionComponent<P & TouchOutsideProps> {
  return ({
    onTouchOutside,
    ...props
  }: P & Pick<ViewProps, "onLayout"> & TouchOutsideProps) => {
    const [nativeTag, setNativeTag] = useState<string>();
    const [childrenTags, setChildrenTags] = useState<string[]>();
    const { addListener, removeListener } = useTouchOutside();

    useEffect(() => {
      if (nativeTag && childrenTags) {
        addListener(nativeTag, childrenTags, onTouchOutside);
      }

      return () => {
        if (nativeTag) {
          removeListener(nativeTag);
        }
      };
    }, [nativeTag, childrenTags]);

    function handleLayout(event: LayoutChangeEvent): void {
      const nativeTag = path<string>(["target", "_nativeTag"], event);

      setNativeTag(nativeTag);
      setChildrenTags(getTargetChildren(event.target));

      if (props.onLayout) {
        props.onLayout(event);
      }
    }

    return <Tag {...(props as P)} onLayout={handleLayout} />;
  };
}

// Convenience exports
export const TouchOutsideView: React.FC<ViewProps & TouchOutsideProps> =
  touchOutside(View);
export const TouchOutsidePressable: React.FC<
  PressableProps & TouchOutsideProps
> = touchOutside(Pressable);
