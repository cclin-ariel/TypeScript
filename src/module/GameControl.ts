import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


//as a GameControl, need to control the other else class(module) 
class GameControl {
    //定義3個屬性
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    //創建一個屬性來儲存蛇的移動方向，也就是按鍵方向
    direction = ''//default a string null
    //遊戲是否結束 蛇的生命
    isLive = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()// constructor(_maxLevel, _upScore)
        //init遊戲初始化方法，調用後，遊戲開始。
        this.init()
    }


    //init遊戲初始化方法，調用後，遊戲開始。
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        //使蛇移動
        this.run();
    }

    //
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key);//return string

        //檢查event.key是否為合法值，用戶是否按對鍵
        //修改direction
        this.direction = event.key;

    }

    //創建蛇移動的方法
    run() {
        //according to this.direction, change the snake direction 
        //to TOP top--
        //to DOWN top++
        //to LEFT left--
        //to RIGHT left++

        //蛇的座標
        let X = this.snake.X
        let Y = this.snake.Y
        ////according to this.direction, 修改座標ＸＹ值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }

        //檢查是否吃到食物
        this.checkEat(X, Y);

        //修改蛇的座標
        try {
            //可正常移動
            this.snake.X = X;// set X()
            this.snake.Y = Y;// set Y()
        } catch (e: any) {
            //進入catch表示
            //蛇超出合法範圍，Snake拋出error(GameControl這裡接)
            //彈出一個訊息
            alert(e.message + 'Game Over!!')
            //結束遊戲
            this.isLive = false
        }

        //開啟定時調用 並調整等級與移動速度
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }//the end of run()

    //定義方法 檢查是否吃到食物(傳入參數：蛇的新座標)
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // change the food position
            this.food.change()

            //add score
            this.scorePanel.addScore()

            //add snake body
            this.snake.addBody()
        }
    }


}









export default GameControl