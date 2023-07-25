<template>
    <div class="waterfall_container_component" ref="waterfall_container_component">
        <div class="grid" ref="grid">
            <div :title-text="item.title" @click="toPixv(item.id)" v-compute-height="{ item: item }" :image-src="item.src"
                v-for="item in list" :key="item.id" class="grid-item">
                <div class="loadingBox">
                    <Loading></Loading>
                </div>
                <img />

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, toRefs, watchEffect } from 'vue';
import Masonry from 'masonry-layout'
import Loading from './loading.vue';

let grid = ref(null as unknown as HTMLDivElement)
let waterfall_container_component = ref(null as unknown as HTMLDivElement)

const toPixv = (id: string) => {
    window.open(`https://www.pixiv.net/artworks/${id}`)
}

defineOptions({
    name: 'Waterfall',
    directives: {
        computeHeight: {
            mounted: (el, binding) => {
                nextTick(() => {
                    let { height, width, title } = binding.value.item
                    el.style.setProperty('--title-text', title)
                    el.style.height = `${el.clientWidth / (width / height)}px`
                })
            }
        }
    }
})



// const props = defineProps({
//     list: {
//         type: IR,
//         default: () => [] as Array<WaterfallItem>
//     },
//     lazyload: {
//         type: Boolean,
//         default: true
//     }
// })

// 1.定义props类型
interface Props {
    list: Array<WaterfallItem>
    lazyload?: boolean
}

// 2.定义默认值
const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    lazyload: true
})


const { list, lazyload } = toRefs(reactive(props))

watchEffect(() => {
    if (list.value.length > 0) {
        setTimeout(() => {
            setMasonry()
        })
    }
})

let setMasonry = () => {
    waterfall_container_component.value.scrollTop = 0
    new Masonry(grid.value, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        // horizontalOrder: true,
        percentPosition: true,
    });
    // 创建一个Intersection Observer实例
    let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                let target = entry.target as HTMLDivElement
                // 如果元素在视口中
                if (entry.isIntersecting) {
                    target.style.visibility = 'visible'
                    target.classList.add('animate');
                    let src = target.getAttribute('image-src') as string
                    target.getElementsByTagName('img')[0].src = src
                    // 停止观察
                    observer.unobserve(entry.target);
                }
            });
    });

    // 让Intersection Observer开始观察一个元素
    let items = [...document.getElementsByClassName('grid-item')]
    new Promise((resolve, reject) => {
        items.forEach(item => {
            observer.observe(item);
        })
        resolve('success')
    })
}
</script>
<style lang="scss" scoped>
.loadingBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.animate {
    // 渐入
    animation: loadAnimate .3s linear;
}

// 前两个不触发动画
.animate:nth-child(-n + 2) {
    animation: none;
}

@keyframes loadAnimate {
    0% {
        transform: translateY(100px);
    }

    100% {
        transform: translateY(0);
    }
}

.grid {
    // height: 100%;
    box-sizing: border-box;
    padding: 0 5px;
}

.grid-item {
    --title-text: '314';
    box-sizing: border-box;
    width: calc(50% - 15px);
    margin: 5px;
    height: 50px;
    background-color: #e5e5e5;
    cursor: pointer;
    counter-increment: listCounter;
    position: relative;
    border-radius: 12px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .18);
    overflow: hidden;
    visibility: hidden;
    &::after {
        content: attr(title-text);
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        top: 0;
        left: 0;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        opacity: 0;
        transition: opacity 0.5s;
    }

    &:hover {
        &::after {
            opacity: 1;
        }

        &>img {
            transform: scale(1.2);
        }

    }


    &>* {
        position: absolute;
        top: 0;
    }

    &>img {
        transition: all .5s ease-in-out;
        transform: scale(1.01);
    }
}

// .grid-item::before {
//     content: counter(listCounter);
//     background-color: #fff;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 50px;
//     height: 50px;
//     line-height: 50px;
//     text-align: center;
//     color: #000;
// }

// @media (max-width: 640px) {
//     .grid-item {
//         box-sizing: border-box;
//         width: 100%;
//         height: 50px;
//         background-color: #e5e5e5;
//         margin: 5px 0;
//     }
// }

.waterfall_container_component {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-width: 1px 0;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .85);

    /* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
    &::-webkit-scrollbar {
        display: none;
    }

    /* 隐藏 IE、Edge 和 Firefox 的滚动条 */
    & {
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
    }
}
</style>