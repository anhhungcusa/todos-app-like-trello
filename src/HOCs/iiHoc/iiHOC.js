
export const  iiHoc = (WrappedComponent) => {
    return class Enhanced extends WrappedComponent {
        render() {
            return super.render()
        }
    }
}