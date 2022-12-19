/* eslint-disable @typescript-eslint/no-non-null-assertion */
//定義score panel
class ScorePanel {
    //記錄用
    public score = 0;
    public level = 1;


    //分數 等級所在的元素。將在constructor內進行初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;



    //設置一個變量來限制等級
    maxLevel: number;
    //設置一個變量來限制幾分升級
    upScore: number;


    constructor(_maxLevel = 10, _upScore = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = _maxLevel;
        this.upScore = _upScore;
    }

    //
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score + '';

        //每10分 升一級
        this.score % this.upScore === 0 ? this.levelUp() : '';

    }

    //
    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + '';
        }
    }

}

//最後將此檔以ScorePanel作為模組，export 出去
export default ScorePanel;