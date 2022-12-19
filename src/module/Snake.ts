/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class Snake {
    //蛇的頭
    head: HTMLElement;
    //蛇的身體 包含頭
    bodies: HTMLCollection;//HTMLCollection 回傳相對應的 element 集合。具有即時性（live），物件會自動更新至最新的狀態。
    //蛇的容器
    snakeContainer: HTMLElement;

    constructor() {
        this.snakeContainer = document.getElementById('snake')!;
        this.head = document.querySelector("#snake > div")!;
        this.bodies = this.snakeContainer.getElementsByTagName('div');

    }

    // 獲取蛇頭座標
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    //設置蛇頭座標(蛇頭的移動)
    set X(value: number) {
        //若新值與舊值相同
        if (this.X === value) return;

        // Ｘ值的合法範圍 0-290
        if (value < 0 || value > 290) {
            //X超出合法範圍，拋出error(讓GameControl接)
            throw new Error('Oh!Poor snake!')
        }

        //避免掉頭情況
        //新蛇頭Ｘ座標為第二節身體的Ｘ座標時，為掉頭請況
        if (this.bodies[1] &&
            (this.bodies[1] as HTMLElement).offsetLeft === value) {
            //如果發生掉頭，讓蛇頭繼續直走
            (value > this.X) ? value = this.X - 10 : value = this.X + 10
        }


        //移動身體
        this.moveBody()
        //蛇頭位置
        this.head.style.left = value + 'px';
        //檢查有沒有撞到自己
        this.checkHeadBody()
    }
    set Y(value: number) {
        //若新值與舊值相同
        if (this.Y === value) return;
        // Y值的合法範圍 0-290
        if (value < 0 || value > 290) {
            //X超出合法範圍，拋出error(讓GameControl接)
            throw new Error('Oh!It\'s the wall!! ')
        }

        //避免掉頭情況
        //新蛇頭Ｙ座標為第二節身體的Ｘ座標時，為掉頭請況
        if (this.bodies[1] &&
            (this.bodies[1] as HTMLElement).offsetTop === value) {
            //如果發生掉頭，讓蛇頭繼續直走
            (value > this.Y) ? value = this.Y - 10 : value = this.Y + 10
        }

        //移動身體
        this.moveBody()
        //蛇頭位置
        this.head.style.top = value + 'px';
        //檢查有沒有撞到自己
        this.checkHeadBody()
    }

    //蛇的身體 增加方法
    addBody() {
        //向蛇的容器添加身體div
        this.snakeContainer.insertAdjacentHTML("beforeend", "<div></div>")
    }

    //蛇的移動方法
    moveBody() {
        //將後面的身體 設置為前一個身體的位置
        //ex: 第三節等於第二節的位置 
        //ex: 第二節等於第一節的位置 

        //獲取所有得身體(不包含頭)
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //獲取前邊身體的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //將值設置到當前的身體
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody() {
        //獲取所有身體，檢查是否和蛇頭發衝重疊
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                //進入判斷表示蛇頭撞到身體
                throw new Error('Oh!It\'s my body!! ')
            }
        }
    }
}





export default Snake 
