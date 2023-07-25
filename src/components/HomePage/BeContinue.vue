<template>
    <section class="rw nx s_">
        <div class="tcontainern">
            <div class="features-tiles-inner rd">
                <div class="rv">
                    <div class="scontainero">
                        <img :src="picture" width="100" />
                        <h2 class="oe ok">未完待续</h2>
                        <p class="sz">将持续开发ACG相关深度学习应用</p>
                        <h2 class="oe ok">...</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/girl.gif'
// eslint-disable-next-line
defineOptions({
    name: 'BeContinue',
})

</script>
<style lang="scss" scoped>
</style>