<template>
    <section class="is nx az reveal-from-top">
        <div class="tcontainern">
            <div class="cta-inner rd iu sx sk">
                <div class="io">
                    <h3 class="sz">{{ $t('star') }}</h3>
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
.cta-inner{
    flex-direction: column;
    gap: 10px;
    white-space: nowrap;

}


</style>