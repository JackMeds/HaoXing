const OpenAI = require("openai");
const fs = require('fs');
const http = require('http');
const HttpsProxyAgent = require('https-proxy-agent');

const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent(process.env.PROXY_URL);

const openaiBaseURL = "https://api.openai.com/v1";

// Example of configuring OpenAI via environment variables:
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     httpAgent: proxyAgent, // Enable if you need to route through a proxy
//     baseURL: process.env.OPENAI_BASE_URL ?? openaiBaseURL,
// });

// 小说处理角色以及对话
const handleNovel = async (req) => {
    // console.log("handleNovel-req:", req);
    const openai = new OpenAI({
        apiKey: req.APIKey,
        // httpAgent: proxyAgent, // 使用代理
        baseURL: req.APIUrl,
    });
    try {
        const response = await openai.chat.completions.create({
            model: req.APIModel,
            messages: [
                {
                    "role": "system",
                    "content": "Your task is to accurately extract characters and their dialogue content from the novel, focusing solely on the dialogue associated with characters and ignoring any narrative text. Most dialogues in the novel are marked with Chinese quotation marks or dashes. Please generate the output in a valid JSON format following the exact structure below. Ensure each object is enclosed in standard JSON formatting with no missing or extra commas. If the output does not conform to this format, please reformat and retry. \n\nJSON format example:\n{\n  \"Roles\": [\n    {\n      \"RoleID\": \"1\",\n      \"RoleName\": \"Character Name\"\n    }\n  ],\n  \"content\": [\n    {\n      \"RoleID\": \"1\",\n      \"RoleName\": \"Character Name\",\n      \"text\": \"Dialogue content\"\n    }\n  ]\n}"
                },
                {
                    "role": "user",
                    "content": req.content
                }
            ],
            temperature: 1,
            max_tokens: 4096,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        // const response = {
        //     "id": "chatcmpl-8hGBjZ2NSWrbbY7aAq6DZ69hDGUnf",
        //     "object": "chat.completion",
        //     "created": 1705321023,
        //     "model": "gpt-4-1106-preview",
        //     "choices": [
        //         {
        //             "index": 0,
        //             "message": {
        //                 "role": "assistant",
        //                 "content": "```json\n{\n  \"Roles\":[\n    {\"RoleID\":\"1\",\"RoleName\":\"秦诚\"},\n    {\"RoleID\":\"2\",\"RoleName\":\"王煊\"}\n  ],\n  \"content\":[\n    {\"RoleID\":\"1\",\"RoleName\":\"秦诚\",\"text\":\"这种旧时代的东西，你真的练成了？\"},\n    {\"RoleID\":\"2\",\"RoleName\":\"王煊\",\"text\":\"按照就旧时代的说法，我这些不算什么。\"},\n    {\"RoleID\":\"1\",\"RoleName\":\"秦诚\",\"text\":\"你别拿过去来比较，我压根就没相信过，事实上，那些记载许多都早已被证伪。\"}\n  ]\n}\n```"
        //             },
        //             "logprobs": null,
        //             "finish_reason": "stop"
        //         }
        //     ],
        //     "usage": {
        //         "prompt_tokens": 2721,
        //         "completion_tokens": 189,
        //         "total_tokens": 2910
        //     },
        //     "system_fingerprint": "fp_168383a679"
        // }

        let result = {};

        if (isValidJson(response.choices[0].message.content)) {
            console.log("Chat completion is json:", response.choices[0].message.content);
            return JSON.parse(response.choices[0].message.content);
        } else {
            console.log("Chat completion convertToJson:", convertToJson(response.choices[0].message.content));
            return convertToJson(response.choices[0].message.content);
        }
        // result.cost = calculateCost(response.usage.total_tokens);
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return null;
    }
}

// Call the async function and write the output to a file
// const printResult = () => {
//     console.log("printResult");
//     fetchChatCompletion().then((response) => {
//         // 将响应对象转换为 JSON 字符串
//         const dataStr = JSON.stringify(response, null, 2); // 第二个和第三个参数确保了输出格式化的 JSON

//         // 现在 dataStr 是一个字符串，可以被写入文件
//         fs.writeFile('./output.txt', dataStr, (err) => {
//             if (err) throw err;
//             console.log('The file has been saved!');
//         });

//     }).catch((error) => {
//         console.error("Error in printResult:", error);
//     });
// }

// 判断字符串是否为 JSON 格式
function isValidJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

// 将字符串转换为 JSON 对象
const convertToJson = (str) => {
    // 去除字符串中的 ```json 和 ```
    const jsonStr = str.replace(/```json\n|```/g, '');

    // 尝试将字符串解析为 JSON 对象
    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("解析 JSON 出错:", error);
        return null;
    }
}

function calculateCost(totalTokens) {
    const pricePerToken = 0.00001;
    return totalTokens * pricePerToken * 7.5;
}

// 假设每个令牌的价格，您需要替换成实际的价格

// const cost = calculateCost(usage.total_tokens, pricePerToken);


// Convert and print the JSON object
// const jsonObj = convertToJson(jsonString);
// console.log(jsonObj);


//export printResult
module.exports = { handleNovel };
