// 防抖
export const debounce = (fn: (...args: any) => void, interval = 300) => {
    let timeout: any = null;
    return function (this: any) {
        // 用局部变量修改arguments作用域
        const args: any = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, args);
        }, interval);
    };
}

// getImgUrl
// 使用 XHLHttpRequest 加载图片，返回图片的 base64 编码
export const getImgUrl = (url:string) =>{
    const req = new XMLHttpRequest()
    req.open('GET', url, false)
    req.onprogress = function(e:ProgressEvent<EventTarget>){
        if(e.loaded === e.total){
            let xhr = e.target as XMLHttpRequest
            let blob = xhr.response as Blob
            // blob 转 base64
            let reader = new FileReader()
            reader.readAsDataURL(blob)

        }

    }
}