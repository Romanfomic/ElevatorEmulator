<template>
    <div>
        <div class="shaft" v-for="position in floors">
            <div class="floor">
                <div class="floor-shaft" :class="{ 'current-floor': currentPos === floors + 1 - position,
                'resting' : isResting && (currentPos === floors + 1 - position) }"></div>
                <div class="position">{{ floors - position + 1 }}</div>
                <button @click="elCall(position)" class="el-btn"></button>
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
                finalPos: 1,
                isActive: false,
                isResting: false,
                floors: 5,
                elQuery: []
            }
        },
        methods: {
            elCall(newPos) {
                this.elQuery.push(this.floors + 1 - newPos);
            },
            elQueryHandler() {
                if (this.isResting) return;
                if (!this.elQuery[0] || this.currentPos === this.elQuery[0]) return;

                this.isActive = true;
                this.goToFloor(this.elQuery[0]);
            },
            goToFloor(newPos) {
                if (newPos > this.currentPos) {
                    this.currentPos++;
                } else if (newPos < this.currentPos) {
                    this.currentPos--;
                }
                if (newPos === this.currentPos) {
                    this.isActive = false;
                    this.isResting = true;
                    setTimeout(() => {
                        this.isResting = false;
                    }, 3000)
                    this.elQuery.shift();
                }
            },
        },
        mounted() {
            let timer = setInterval(() => this.elQueryHandler(), 1000);
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
    .resting {
        background-color: grey;
    }
</style>