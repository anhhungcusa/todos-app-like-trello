import uuid from 'uuid';

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
//Date
const dayList = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy' ]
export const getDDM = (time) => {
    const thisYear = (new Date()).getFullYear();
    const date = new Date(time - 0);
    let timeYear = date.getFullYear();
    if( timeYear >  thisYear){ 
        timeYear = `, Năm ${timeYear}`;}
    else {
        timeYear = '';
    }
    return `${dayList[date.getDay()]}, Ngày ${date.getDate()}, Tháng ${date.getMonth() + 1}${timeYear}`;
}

//create  default obj

export const createDefaultDay = () => (new Date().setHours(1, 0, 0, 0));
export const createOptionDay = (d, m, y) => (new Date(y, m, d).setHours(1, 0, 0, 0));
export const createTodo = (title) => ({
    id: uuid(),
    title,
    description: 'bla bla bla...',
    isCompleted: false
})
export const createTodoGroup = () => ({
    isValid: true,
    todos: [
        {
            id: uuid(),
            title: 'Do something',
            description: 'bla bla bla...',
            isCompleted: false
        }
    ]
})
