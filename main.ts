namespace SpriteKind {
    export const ground = SpriteKind.create()
}
function hit_floor (floor: Sprite) {
    if (bot.overlapsWith(floor)) {
        while (bot.overlapsWith(floor)) {
            gravity_direction = bot.vy / Math.abs(bot.vy)
            bot.y += gravity_direction * -1
        }
        bot.y += gravity_direction
        bot.vy = 0
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bot.overlapsWith(bottom)) {
        bot.vy = -150
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (bot, obstacle) {
    game.over(true)
})
function spawn_obstacle () {
    obstacle = sprites.create(assets.image`blue obstacle`, SpriteKind.Enemy)
    obstacle.bottom = 110
    obstacle.left = camera_right - 5
    last_spawn_x = obstacle.left
    obstacle.setFlag(SpriteFlag.AutoDestroy, true)
}
function move_camera () {
    scene.centerCameraAt(bot.x + camera_offset, 60)
    camera_right = scene.cameraProperty(CameraProperty.Right)
}
function y_movement () {
    bot.vy += gravity
}
let obstacle: Sprite = null
let gravity_direction = 0
let bot: Sprite = null
let bottom: Sprite = null
let camera_right = 0
let last_spawn_x = 0
let camera_offset = 0
let gravity = 0
gravity = 8
let game_speed = 50
let min_spawn_gap = 50
camera_offset = 64
last_spawn_x = 0
camera_right = scene.cameraProperty(CameraProperty.Right)
bottom = sprites.create(assets.image`bottom`, SpriteKind.ground)
bottom.bottom = 120
bottom.vx = game_speed
bot = sprites.create(assets.image`bot`, SpriteKind.Player)
bot.setPosition(16, 80)
bot.vx = game_speed
bot.z = -1
scene.setBackgroundColor(1)
spawn_obstacle()
game.onUpdate(function () {
    move_camera()
    if (camera_right - last_spawn_x > min_spawn_gap) {
        if (randint(1, 15) == 1) {
            spawn_obstacle()
        }
    }
    y_movement()
    hit_floor(bottom)
    info.changeScoreBy(1)
})