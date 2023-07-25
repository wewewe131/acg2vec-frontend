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