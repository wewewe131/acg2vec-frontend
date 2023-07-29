<template>
    <section class="is nx az reveal-from-top">
        <div class="tcontainern">
            <div class="cta-inner rd iu sx sk">
                <div class="io">
                    <span>{{ $t('star') }}</span>
                    <h3 class="sz">{{ $t('star_detail') }}</h3>
                    <span>{{ $t('star') }}</span>
                </div>
                <div class="cta-action">
                    <a class="tbuttonn fbuttonl gbuttony" href="https://github.com/OysterQAQ/ACG2vec" target="_blank"><img
                            :src="picture" style="margin: 0;" alt="Abstract" width="32" height="32" />Github</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts"  setup>
import picture from '../../../public/static/picture/github.svg'

defineOptions({
    ComponentOptions: {
        name: 'Star'
    }
})

</script>
<style lang="scss" scoped>
.cta-inner {
    flex-direction: column;
    gap: 20px;
    // white-space: nowrap;
}

.io {
    margin:0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    .sz{
        text-align: center;
        line-height: 30px;
    }
}
.cta-action{
    display: flex;
    justify-content: center;
}
</style>