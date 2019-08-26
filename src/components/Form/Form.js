import React from 'react' 
const Form = (props) => {
    console.log('lazi loading')
    return (
        <form>
            <input type="text" onChange={(e) => e.target.value} />
            <input type="checkbox" onChange={(e) => e.target.checked} />
            <input type="radio" onChange={(e) => e.target.checked} />
            <textarea  value={'string'} onChange={e => e.target.value} />
            <select value={'option value'} onChange={e => e.target.value}>
                <option value="option value">1</option>
                <option>21</option>
                <option>31</option>
            </select>
        </form>
    )
}
// export function add(a, b) {
//     return a + b;
// }
export default Form;
console.log('tlelelle');
