<template>
    <div>
        <div class="shaft" v-for="position in floors">
            <div class="floor">
                <div class="floor-shaft" :class="{ 'current-floor': currentPos === floors + 1 - position }"></div>
                <div class="position">{{ floors - position + 1 }}</div>
                <button class="el-btn"></button>
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
                floors: 5,
                elQuery: []
            }
        }
    }
</script>

<style scoped>
    .shaft {
        height: 50px;
    }
    .floor-shaft {
        height: 50px;
        width: 40px;
        border-right: 1px solid black;
        border-left: 1px solid black;
        margin: 0;
        margin-left: 10px;
    }
    hr {
        margin: 0;
    }
    .floor {
        display: flex;
        align-items: center;
    }
    .position {
        margin-left: 10px;
    }
    .el-btn {
        margin-left: 5px;
        padding: 0;
        height: 16px;
        width: 16px;
        border-radius: 8px;
        border: 1px solid deepskyblue;
    }
    .el-btn:hover {
        cursor: pointer;
    }
    .current-floor {
        background-color: dodgerblue;
    }
</style>