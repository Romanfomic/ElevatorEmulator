<template>
    <div class="el-system">
        <div class="elevator"></div>
        <div class="shaft" v-for="position in floors">
            <div class="floor">
                <div class="floor-shaft"></div>
                <div class="position">{{ floors - position + 1 }}</div>
                <button class="el-btn">вызвать</button>
            </div>
            <hr/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                currentPos: 1,
                isActive: false,
                isResting: false,
                floors: 5
            }
        }
    }
</script>

<style scoped>
</style>