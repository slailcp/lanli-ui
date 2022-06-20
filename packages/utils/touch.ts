type Direction = '' | 'vertical' | 'horizontal';

function getDirection(x: number, y: number) {
    if (x > y) {
        return 'horizontal';
    }
    if (y > x) {
        return 'vertical';
    }
    return '';
}

export class Touch {
    initX = 0;
    initY = 0;
    parentOffsetX = 0;
    parentOffsetY = 0;
    deltaX = 0;
    deltaY = 0;
    offsetX = 0;
    offsetY = 0;
    direction = '';
    isLockDirection = false;


    isVertical() { return this.direction === 'vertical'; }
    isHorizontal() { return this.direction === 'horizontal'; }

    reset() {
        this.deltaX = 0;
        this.deltaY = 0;
        this.parentOffsetX = 0;
        this.parentOffsetY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.direction = '';
        this.isLockDirection = false;
    }

    start(event: TouchEvent) {
        this.reset()
        this.initX = event.touches[0].clientX;
        this.initY = event.touches[0].clientY;
        if (event.target) {
            const bound = (event.target as HTMLElement).getBoundingClientRect();
            this.parentOffsetX = Math.floor(bound.x);
            this.parentOffsetY = Math.floor(bound.y);
        }
    }

    move(event: TouchEvent) {
        const touch = event.touches[0];
        this.deltaX = (touch.clientX < 0 ? 0 : touch.clientX) - this.initX;
        this.deltaY = touch.clientY - this.initY;
        this.offsetX = Math.abs(this.deltaX);
        this.offsetY = Math.abs(this.deltaY);


        const DIRECTION_DISTANCE = 10; // 超过这个距离就锁定方向。
        
        if (!this.isLockDirection && (this.offsetX > DIRECTION_DISTANCE || this.offsetY > DIRECTION_DISTANCE)) {
            this.isLockDirection = true;
            this.direction = getDirection(this.offsetX, this.offsetY);
        }

        if (this.offsetX < DIRECTION_DISTANCE && this.offsetX < DIRECTION_DISTANCE) {
            this.direction = getDirection(this.offsetX, this.offsetY);
        }
    }
}

