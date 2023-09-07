<template>
    <section class="rw nx s_">
        <div class="tcontainern">
            <div class="features-tiles-inner rd">
                <div class="rv">
                    <div class="scontainero">
                        <img :src="picture" width="100" />
                        <h2 class="oe ok">{{ $t('to_be_continue') }}</h2>
                        <p class="sz">{{ $t('continue') }}</p>
                        <h2 class="oe ok">...</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import picture from '../../../public/static/picture/girl.gif'
defineOptions({
    name: 'BeContinue',
})

</script>
<style lang="scss" scoped>
</style>