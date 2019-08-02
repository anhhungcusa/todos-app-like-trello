//coordinate
//---document-relative coordinate
export const findDocumentRelativeCoordinate  = (currentRef) => {
    let top = 0, left = 0;
    (function recursion(value) {
        if (value.offsetParent !== null) {
            top += value.offsetTop;
            left += value.offsetLeft;
            recursion(value.offsetParent);
        }
    })(currentRef)
    return [top, left];
}
//---window-relative coordinate
export const findWindowRelativeCoordinate = () => {

}

