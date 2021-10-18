import { useContext, useEffect, useState } from "react";
import { TouchOutsideContext } from "../context/TouchOutsideContext";

export function useTouchOutside() {
    const [nativeTag, setNativeTag] = useState<string>()
    const { addChildHandler, removeChildHandler } = useContext(TouchOutsideContext)

    useEffect(() => {
        return () => {
            if (nativeTag) {
                removeListener(nativeTag)
            }
        }
    }, [])

    function addListener(id: string, callback: (id: string) => void): void {
        setNativeTag(id);
        addChildHandler(id, callback)
    }

    function removeListener(id: string): void {
        removeChildHandler(id)
    }

    return {
        addListener,
        removeListener
    }
}