import { isEmpty, isNil } from "ramda";

export function getTargetChildren(target: any): string[] {

    const targetChildren: string[] = []

    function getTargetChild(target: any): void {
        if (target._nativeTag) {
            targetChildren.push(target._nativeTag)
        }

        if (target._children) {
            target._children.forEach((targetChild: any) => {
                getTargetChild(targetChild)
            })
        }
    }

    getTargetChild(target);

    return targetChildren.filter((targetChild) => !isNil(targetChild) && !isEmpty(targetChild));
}