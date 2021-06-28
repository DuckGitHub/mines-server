module.exports = {
    // Game status
    GAME_STATUS:  {
        ACTIVE: 0x1,
        WIN: 0x2,
        OVER: 0x4,
    },

    // Min Rows & Cols
    MIN_ROWS : 6,
    MIN_COLUMNS : 6,

    // Cell configurations
    UNCOVER_CELL : {
        TRUE: 0x10,
        FALSE: 0x20,
    },

    MARK_CELL : {
        NONE: 0x1,
        FLAG: 0x2,
        DOUBTFUL: 0x4,

        ANY: 0x7,
    },
}