const axios = require('axios');

const importAudio = async (event, url) => {
  try {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    console.log(url);
    const createOptions = {
      method: 'POST',
      url: 'https://aip.baidubce.com/rpc/2.0/aasr/v1/create?access_token=24.a3c6920496bed2dbb96613bac37cc056.2592000.1693990133.282335-37321564',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        "speech_url": url,
        "format": "mp3",
        "pid": 80001,
        "rate": 16000
      }
    };

    const createResponse = await axios(createOptions);
    const task_id = createResponse.data.task_id;
    console.log(task_id);

    let task_status = 'Running';
    let result = null;

    while (task_status === 'Running') {
      await sleep(1000); // 等待1秒再查询任务状态
      const queryOptions = {
        method: 'POST',
        url: 'https://aip.baidubce.com/rpc/2.0/aasr/v1/query?access_token=24.a3c6920496bed2dbb96613bac37cc056.2592000.1693990133.282335-37321564',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          "task_ids": [task_id]
        }
      };

      const queryResponse = await axios(queryOptions);
      task_status = queryResponse.data.tasks_info[0].task_status;
      console.log('Task Status:', task_status);
      result = queryResponse.data;
    }

    // 任务完成后输出结果
    console.log('Task Completed:', task_status);
    // console.log('Result:', result.tasks_info[0].task_result.result[0]);
    return result.tasks_info[0].task_result.result[0];
    // {
    //     "log_id": 16914158614300672,
    //     "tasks_info": [
    //         {
    //             "task_status": "Success",
    //             "task_result": {
    //                 "result": [
    //                     "将进酒。李白。君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮程雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮300杯，陈夫子丹丘生将进酒杯莫停。与君歌一曲，请君为我倾耳听钟鼓馔玉不足贵，但愿长醉不愿醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢叙主人何谓言少钱径须沽取对君酌五花马千金裘，忽而将出换美酒，与尔同销万。古城。"
    //                 ],
    //                 "audio_duration": 116768,
    //                 "detailed_result": [
    //                     {
    //                         "res": [
    //                             "将进酒。"
    //                         ],
    //                         "end_time": 4580,
    //                         "begin_time": 2180,
    //                         "words_info": [],
    //                         "sn": "752208142611691415858",
    //                         "corpus_no": "7264575795317804797"
    //                     },
    //                     {
    //                         "res": [
    //                             "李白。"
    //                         ],
    //                         "end_time": 6275,
    //                         "begin_time": 4640,
    //                         "words_info": [],
    //                         "sn": "290987555151691415858",
    //                         "corpus_no": "7264575795220405912"
    //                     },
    //                     {
    //                         "res": [
    //                             "君不见黄河之水天上来，奔流到海不复回。"
    //                         ],
    //                         "end_time": 9840,
    //                         "begin_time": 8140,
    //                         "words_info": [],
    //                         "sn": "55988804961691415858",
    //                         "corpus_no": "7264575795328230706"
    //                     },
    //                     {
    //                         "res": [
    //                             "君不见高堂明镜悲白发，朝如青丝暮程雪。"
    //                         ],
    //                         "end_time": 28120,
    //                         "begin_time": 18960,
    //                         "words_info": [],
    //                         "sn": "27684975771691415859",
    //                         "corpus_no": "7264575799092006771"
    //                     },
    //                     {
    //                         "res": [
    //                             "人生得意须尽欢，莫使金樽空对月。"
    //                         ],
    //                         "end_time": 39640,
    //                         "begin_time": 31260,
    //                         "words_info": [],
    //                         "sn": "88116626401691415859",
    //                         "corpus_no": "7264575799153079789"
    //                     },
    //                     {
    //                         "res": [
    //                             "天生我材必有用，千金散尽还复来。"
    //                         ],
    //                         "end_time": 47760,
    //                         "begin_time": 40120,
    //                         "words_info": [],
    //                         "sn": "648972943231691415859",
    //                         "corpus_no": "7264575799495415890"
    //                     },
    //                     {
    //                         "res": [
    //                             "烹羊宰牛且为乐，会须一饮300杯，陈夫子丹丘生将进酒杯莫停。"
    //                         ],
    //                         "end_time": 55960,
    //                         "begin_time": 48520,
    //                         "words_info": [],
    //                         "sn": "464484561801691415859",
    //                         "corpus_no": "7264575799565914461"
    //                     },
    //                     {
    //                         "res": [
    //                             "与君歌一曲，请君为我倾耳听钟鼓馔玉不足贵，但愿长醉不愿醒。"
    //                         ],
    //                         "end_time": 71260,
    //                         "begin_time": 64240,
    //                         "words_info": [],
    //                         "sn": "549083550711691415859",
    //                         "corpus_no": "7264575799631143088"
    //                     },
    //                     {
    //                         "res": [
    //                             "古来圣贤皆寂寞，惟有饮者留其名。"
    //                         ],
    //                         "end_time": 88460,
    //                         "begin_time": 80080,
    //                         "words_info": [],
    //                         "sn": "585363972381691415859",
    //                         "corpus_no": "7264575799607227796"
    //                     },
    //                     {
    //                         "res": [
    //                             "陈王昔时宴平乐，斗酒十千恣欢叙主人何谓言少钱径须沽取对君酌五花马千金裘，忽而将出换美酒，与尔同销万。"
    //                         ],
    //                         "end_time": 96200,
    //                         "begin_time": 89060,
    //                         "words_info": [],
    //                         "sn": "750776088641691415859",
    //                         "corpus_no": "7264575799681830104"
    //                     },
    //                     {
    //                         "res": [
    //                             "古城。"
    //                         ],
    //                         "end_time": 115055,
    //                         "begin_time": 112920,
    //                         "words_info": [],
    //                         "sn": "46617016141691415859",
    //                         "corpus_no": "7264575798996714928"
    //                     }
    //                 ],
    //                 "corpus_no": "7264575795317804797"
    //             },
    //             "task_id": "64d0f525bbe2d90001b2621e"
    //         }
    //     ]
    // }
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = { importAudio };
