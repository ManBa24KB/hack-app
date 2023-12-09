/*响应式布局 start*/
export const setRootFontSize = () => {
    const width: number = document.documentElement.clientWidth || document.body.clientWidth
    if(width > 750) {
        const fontSize: number = width >= 1440 ? 1 : (width / 1440)
        const elm: any = document.getElementsByTagName('html')[0]
        elm.style['font-size'] = fontSize + 'px'
    }else {
        const fontSize = (width/750)*2
        const elm: any = document.getElementsByTagName('html')[0]
        elm.style['font-size'] = fontSize + 'px'
    }
}
setRootFontSize()

window.addEventListener('resize', function() {
    setRootFontSize()
}, false)