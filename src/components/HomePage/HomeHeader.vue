<template>
    <header class="nb reveal-from-top">
        <div class="tcontainern">
            <div class="n_">
                <div class="nk">
                    <h1 class="sz"><a href=""><img :src="picture" alt="Abstract" width="32" height="32" /></a></h1>
                </div>
                <button id="tc" class="tc" aria-controls="primary-menu" aria-expanded="false"><span class="se">Menu</span>
                    <span class="th"><span class="tp"></span></span></button>
                <nav id="nj" class="nj">
                    <div class="nq">
                        <ul class="st h re">
                            <li><a href="https://cheerfun.dev" target="_blank">Cheerfun</a></li>
                            <li tabindex="0" class="language_selector_pc">
                                <div class="current_language"><span
                                        :class="checklanguage($i18n.locale).flagclass"></span><span>{{
                                            checklanguage($i18n.locale).language }}</span></div>
                                <ul class="items">
                                    <li tabindex="0" class="item" @keydown.enter="() => $i18n.locale = 'zh'"
                                        @click="() => $i18n.locale = 'zh'">
                                        <span class="fi fi-cn"></span>
                                        <span>中文</span>
                                    </li>
                                    <li tabindex="0" class="item" @keydown.enter="() => $i18n.locale = 'en'"
                                        @click="() => $i18n.locale = 'en'">
                                        <span class="fi fi-gb"></span>
                                        <span>English</span>
                                    </li>
                                    <li tabindex="0" class="item" @keydown.enter="() => $i18n.locale = 'jp'"
                                        @click="() => $i18n.locale = 'jp'">
                                        <span class="fi fi-jp"></span>
                                        <span>日本語</span>
                                    </li>
                                </ul>
                            </li>
                            <li class="language_selector_pe"><a @click="showDialog">Language</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div v-show="dialogFlag" class="dialog" @click="dialogFlag = false">
            <div class="content">
                <div @click.stop="" class="current_language">Now:<span
                        :class="checklanguage($i18n.locale).flagclass"></span><span>{{
                            checklanguage($i18n.locale).language
                        }}</span></div>
                <ul @click="dialogFlag = false">
                    <li @click="() => $i18n.locale = 'zh'"><span class="fi fi-cn"></span><span>中文</span>
                    </li>
                    <li @click="() => $i18n.locale = 'en'"><span class="fi fi-gb"></span><span>English</span></li>
                    <li @click="() => $i18n.locale = 'jp'"><span class="fi fi-jp"></span><span>日本語</span></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script lang="ts" setup>
// import { getCurrentInstance } from 'vue';
import { computed, ref, watch, watchEffect } from 'vue';
import picture from '../../../public/static/picture/logo.png'
defineOptions({
    name: 'HomeHeader',
})


// let thisInstance = getCurrentInstance()
// console.log(thisInstance);
// let languages = thisInstance?.proxy?.$i18n.availableLocales.map(v => {
//     return {
//         key: `locale-${v}`,
//         value: v
//     }
// })
let checklanguage = (str: string) => {
    switch (str) {
        case 'zh':
            return { language: '中文', flagclass: 'fi fi-cn' }
        case 'en':
            return { language: 'English', flagclass: 'fi fi-gb' }
        case 'jp':
            return { language: '日本語', flagclass: 'fi fi-jp' }
        default:
            return { language: '中文', flagclass: 'fi fi-cn' }
    }
}
const dialogFlag = ref(false);
const showDialog = () => {
    dialogFlag.value = true
}

watch(dialogFlag, (newVal, oldVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }
})
</script>
<style lang="scss" scoped>
.language_selector {


    &_pe {
        display: none;
    }

    @media (max-width: 640px) {
        &_pc {
            display: none;
        }

        &_pe {
            display: block;
        }
    }

    &_pc {
        --language-background-color: #58678c;
        text-transform: uppercase;
        font-weight: bold;
        position: relative;
        height: 38px;
        width: 118.34px;
        background-color: var(--language-background-color);
        color: #58678c;
        border-radius: 5px;

        .current_language {
            border-radius: 5px;
            height: 100%;
            display: flex;
            padding: 4px 24px 4px 16px;
            align-items: center;
            cursor: pointer;
            color: #fff;

            :last-child {
                padding-left: 5px;
            }
        }

        .items {
            display: none;
            border-radius: 5px;
            margin: 0;
            padding: 0;
            width: 100%;
            list-style: none;
            background-color: #fff;
            margin-top: 2px;
            padding: 5px 0;

            .item {
                cursor: pointer;
                width: 100%;
                padding: 4px 24px 4px 16px;
                box-sizing: border-box;

                :last-child {
                    padding-left: 5px;
                }

                &:hover {
                    background-color: #58678c2a;
                    // color: #fff;
                }
            }
        }

        &:focus-within {
            .items {
                display: block;
            }
        }

    }
}


.dialog {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: .5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: hidden;

    .content {
        width: 80%;
        background-color: #fff;

        .current_language {
            background-color: #fff;
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            cursor: pointer;
        }

        ul {
            // display: none;
            margin: 0;
            padding: 0;

            li {
                margin: 0;
                padding: 0;
                list-style: none;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                cursor: pointer;
            }
        }
    }

}
</style>
