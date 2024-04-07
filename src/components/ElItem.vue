<template>
    <div>
        <div class="shaft" v-for="position in floors">
            <div class="floor">
                <div class="floor-shaft" :class="{ 'current-floor': checkCurrentFloor(position),
                'resting' : isResting && checkCurrentFloor(position) }">
                    <div class="state" v-if="isActive && checkCurrentFloor(position)">
                        <div class="final-floor">{{ this.elQuery[0] }}</div>
                        <img v-if="direction" height="20px" width="20px" src="@/assets/img/arrow_up.png">
                        <img v-else height="20px" width="20px" src="@/assets/img/arrow_down.png">
                    </div>
                </div>
                <div class="position">{{ floors - position + 1 }}</div>
                <button @click="elCall(position)" class="el-btn"
                        :class="{ 'current-btn': checkCurrentButton(position),
                        'wait-btn': checkWaitButton(position) }"
                ></button>
            </div>
            <hr/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                direction: true,
                currentPos: 1,
                isActive: false,
                isResting: false,
                floors: 5,
                elQuery: [],
            }
        },
        methods: {
            elCall(newPos) {
                this.elQuery.push(this.floors + 1 - newPos);
                this.$cookies.set('elQuery', JSON.stringify(this.elQuery))
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
                    this.direction = true;
                } else if (newPos < this.currentPos) {
                    this.currentPos--;
                    this.direction = false;
                }
                this.$cookies.set('currentPos', this.currentPos);
                if (newPos === this.currentPos) {
                    this.isActive = false;
                    this.isResting = true;
                    setTimeout(() => {
                        this.isResting = false;
                    }, 3000)
                    this.elQuery.shift();
                }
                this.$cookies.set('elQuery', JSON.stringify(this.elQuery))
            },
            checkCurrentFloor(pos) {
                if (this.currentPos === this.floors + 1 - pos) return true;
                return false;
            },
            checkCurrentButton(pos) {
                if (this.elQuery[0] === this.floors + 1 - pos) return true;
                return false;
            },
            checkWaitButton(pos) {
                for (let i = 1; i < this.elQuery.length; i++) {
                    if (this.elQuery[i] === this.floors + 1 - pos) return true;
                }
                return false;
            }
        },
        mounted() {
            if (this.$cookies.get('currentPos')) {
                this.currentPos = parseInt(this.$cookies.get('currentPos'));
            }
            if (this.$cookies.get('elQuery')) {
                this.elQuery = this.$cookies.get('elQuery');
            }
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
        margin: 0 0 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .state {
        display: flex;
        align-items: center;
        justify-content: center;
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
        animation-duration: 1s;
        animation-name: isActiveAnim;
    }
    .resting {
        background-color: grey;
    }
    .wait-btn {
        background-color: orange;
    }
    .current-btn {
        background-color: darkred;
    }

    @keyframes isActiveAnim {
        0% {
            opacity: 0;
        }
        100% {
           opacity: 1;
        }
    }
</style>