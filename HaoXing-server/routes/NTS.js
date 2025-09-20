const express = require('express');
const router = express.Router();
const pool = require("../dao/pool");
const { handleNovel } = require('../NTS_src/service/IdentifyConversations');
const { myprocess } = require('../NTS_src/index');
const { StoreSoundBook, findSoundBookByNovelName, findSoundBookByUserID, findSoundBookInforByNovelName, getLikeStatus, getCollectStatus, likeSoundBook, dislikeSoundBook, collectSoundBook, uncollectSoundBook, findAllSoundBook, getUserCollectSoundBook, deleteUserSoundBook, updateSoundBookImage } = require('../NTS_src/service/SoundBook');
const { readFileList, readNovel } = require('../NTS_src/service/readNovel');
const { createUser } = require('../NTS_src/service/user');
const {createComment, createReply, getCommentList} = require('../NTS_src/service/comment');
const axios = require('axios'); // 添加 axios 导入

const AZURE_API_KEY = "d75fd5769af04187bb777d4f4e6da373";
const AZURE_REGION = "eastasia";

// 获取音色列表的 API 路由
router.get('/getSoundList', async (req, res) => {
    try {
        // Static voice list to avoid Azure API call errors.
        const soundList = [
            { voice: 'zh-CN-XiaoxiaoNeural', rgb: 'rgb(14, 165, 233)', name: '晓晓', listen: '' },
            { voice: 'zh-CN-XiaoyiNeural', rgb: 'rgb(239, 68, 68)', name: '晓伊', listen: '' },
            { voice: 'zh-CN-YunjianNeural', rgb: 'rgb(249, 115, 22)', name: '云间', listen: '' },
            { voice: 'zh-CN-YunxiNeural', rgb: 'rgb(245, 158, 11)', name: '云希', listen: '' },
            { voice: 'zh-CN-YunxiaNeural', rgb: 'rgb(132, 204, 22)', name: '云夏', listen: '' },
            { voice: 'zh-CN-YunyangNeural', rgb: 'rgb(34, 197, 94)', name: '云扬', listen: '' },
            { voice: 'zh-CN-liaoning-XiaobeiNeural', rgb: 'rgb(16, 185, 129)', name: '辽宁-晓北', listen: '' },
            { voice: 'zh-CN-shaanxi-XiaoniNeural', rgb: 'rgb(20, 184, 166)', name: '陕西-晓妮', listen: '' }
        ];

        // 返回格式化后的音色列表
        res.json({ data: soundList });
    } catch (error) {
        console.error("Failed to generate static sound list:", error);
        res.status(500).json({ error: "Failed to fetch sound list" });
    }
});

// 生成随机 RGB 颜色
function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//adduser
router.post("/adduser", (req, res) => {
    console.log(req.body);
    let result = createUser(req.body).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
}
)

router.post("/handlenovel", (req, res) => {
    console.log(req.body);
    let result = handleNovel(req.body).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
}
)

router.post("/nts", async (req, res) => {
    console.log(req.body);

    try {
        const response = await myprocess(req.body.markedNovel);
        console.log("response:", response);

        const storeResponse = await StoreSoundBook({
            timestamp: response.data.timestamp,
            novelID: req.body.novelID,
            chapterID: req.body.chapterID,
            novelName: req.body.novelName,
            userid: req.body.userid
        });
        console.log("storeResponse:", storeResponse);

        res.json({
            code: 200,
            msg: "success",
            data: storeResponse
        });
    } catch (error) {
        console.error("Error in processing:", error);
        res.json({
            code: 500,
            msg: "error",
            data: error.message // 发送错误信息的文本部分
        });
    }
});

router.get("/getnovellist", (req, res) => {
    console.log(req.query);
    readFileList().then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
});

router.get("/getnovel", (req, res) => {
    console.log(req.query);
    readNovel(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
});

router.get("/findSoundBookByNovelName", (req, res) => {
    console.log(req.query);
    findSoundBookByNovelName(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
})

router.get("/getnovelInfor", (req, res) => {
    console.log(req.query);
    findSoundBookInforByNovelName(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
})

router.get("/findSoundBookByUserID", (req, res) => {
    console.log(req.query);
    findSoundBookByUserID(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
})

router.get("/getLikeStatus", (req, res) => {
    console.log(req.query);
    getLikeStatus(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "getLikeStatus",
                data: response
            }
        );
    }).catch((error) => {
        console.error("getLikeStatus:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
}
)

router.post("/likeSoundBook", (req, res) => {
    console.log(req.soundBookId);
    likeSoundBook(req.body).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in printResult:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
})

router.post("/dislikeSoundBook", (req, res) => {
    console.log(req.body);
    dislikeSoundBook(req.body).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "success",
                data: response
            }
        );
    }).catch((error) => {
        console.error("Error in dislikeSoundBook:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
})

router.get("/getCollectStatus", (req, res) => {
    console.log(req.query);
    getCollectStatus(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "getCollectStatus",
                data: response
            }
        );
    }).catch((error) => {
        console.error("getCollectStatus:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
}
)

router.post("/collectSoundBook", (req, res) => {
    console.log(req.body);
    collectSoundBook(req.body).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "collectSoundBook",
                data: response
            }
        );
    }).catch((error) => {
        console.error("collectSoundBook:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
}
)

router.post("/uncollectSoundBook", (req, res) => {
    console.log(req.body);
    uncollectSoundBook(req.body).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "uncollectSoundBook",
                data: response
            }
        );
    }).catch((error) => {
        console.error("uncollectSoundBook:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
}
)

router.get("/getUserCollectSoundBook", (req, res) => {
    console.log(req.query);
    getUserCollectSoundBook(req.query).then((response) => {
        console.log("response:", response);
        res.json(
            {
                code: 200,
                msg: "getUserCollectSoundBook",
                data: response
            }
        );
    }).catch((error) => {
        console.error("getUserCollectSoundBook:", error);
        res.json(
            {
                code: 500,
                msg: "error",
                data: error
            }
        );
    })
})

router.get('/GetBookList', (req, res) => {
    console.log(req.query);
    findAllSoundBook(req.query).then((response) => {
        console.log("response:", response);
        res.json({
            code: 200,
            msg: "success",
            data: response
        });
    }).catch((error) => {
        console.error("findAllSoundBook:", error);
        res.json({
            code: 500,
            msg: "error",
            data: error
        });
    })
})

router.post("/deleteUserSoundBook", (req, res) => {
    console.log(req.body);
    deleteUserSoundBook(req.body).then((response) => {
        console.log("response:", response);
        res.json({
            code: 200,
            msg: "success",
            data: response
        });
    }).catch((error) => {
        console.error("deleteUserSoundBook:", error);
        res.json({
            code: 500,
            msg: "error",
            data: error
        });
    })
})

router.post("/createComment", (req, res) => {
    console.log(req.body);
    createComment({
        novelName: req.body.novelName,
        usersid: req.body.usersid,
        content: req.body.content
    }).then((response) => {
        console.log("response:", response);
        res.json({
            code: 200,
            msg: "success",
            data: response
        });
    }).catch((error) => {
        console.error("createComment:", error);
        res.json({
            code: 500,
            msg: "error",
            data: error
        });
    })
})

router.post("/createReply", (req, res) => {
    console.log(req.body);
    createReply({
        commentId: req.body.commentId,
        usersid: req.body.usersid,
        content: req.body.content
    }).then((response) => {
        console.log("response:", response);
        res.json({
            code: 200,
            msg: "success",
            data: response
        });
    }).catch((error) => {
        console.error("createReply:", error);
        res.json({
            code: 500,
            msg: "error",
            data: error
        });
    })
})

router.get("/getCommentList", (req, res) => {
    console.log(req.query);
    getCommentList({novelName:req.query.novelName}).then((response) => {
        console.log("response:", response);
        res.json({
            code: 200,
            msg: "success",
            data: response
        });
    }).catch((error) => {
        console.error("getCommentList:", error);
        res.json({
            code: 500,
            msg: "error",
            data: error
        });
    })
})

// 上传图片
router.post('/uploadImage', (req, res) => {
    updateSoundBookImage(req, res);
});

module.exports = router;