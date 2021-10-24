import { useContext } from "react";
import { TouchOutsideContext } from "../context/touch-outside.context";

export function useTouchOutside() {
    const { addHandler, removeHandler } = useContext(TouchOutsideContext)

    function addListener(id: string, callback: (id: string) => void): void {
        addHandler(id, callback)
    }

    function removeListener(id: string): void {
        removeHandler(id)
    }

    return {
        addListener,
        removeListener
    }
}