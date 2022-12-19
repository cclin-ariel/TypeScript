/* eslint-disable @typescript-eslint/no-non-null-assertion */

//定義food的移動範圍
class Food {
    //定義type
    element: HTMLElement;

    constructor() {
        //獲取頁面中的food 並將其賦值給element
        this.element = document.getElementById('food')!;
    }

    //獲取food X軸座標 Y軸座標 的方法
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    //修改食物座標的方法
    change() {
        // 生成隨機座標
        // 座標 0-290
        // snake 移動單位為10 
        let left = Math.floor(Math.random() * 30) * 10;
        let top = Math.floor(Math.random() * 30) * 10;

        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

//最後將此檔以Food作為模組，export 出去
export default Food;