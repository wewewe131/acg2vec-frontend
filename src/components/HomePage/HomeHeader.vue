<template>
    <header class="nb reveal-from-top">
        <div class="tcontainern">
            <div class="n_">
                <div class="nk">
                    <h1 class="sz"><a href=""><img :src="picture" alt="Abstract" width="32"
                                height="32" /></a></h1>
                </div>
                <button id="tc" class="tc" aria-controls="primary-menu" aria-expanded="false"><span class="se">Menu</span>
                    <span class="th"><span class="tp"></span></span></button>
                <nav id="nj" class="nj">
                    <div class="nq">
                        <ul class="st h re">
                            <li><a href="https://cheerfun.dev" target="_blank">Cheerfun</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/logo.png'
defineOptions({
    name: 'HomeHeader',
})

</script>
<style lang="scss" scoped>
</style>