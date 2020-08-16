### test

``` sh
curl --tlsv1.2 -v -k -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
"update_id":10000,
"message":{
  "date":1441645532,
  "chat":{
     "last_name":"Test Lastname",
     "id":1111111,
     "first_name":"Test",
     "username":"Test"
  },
  "message_id":1365,
  "from":{
     "last_name":"Test Lastname",
     "id":1111111,
     "first_name":"Test",
     "username":"Test"
  },
  "text":"/start"
}
}' "https://YOUR.BOT.URL:YOURPORT/"
```

新建一个 worker 脚本

新建完脚本以后, 是一个简单的hello world 网页, 直接就是工作的.

通过 save and deploy 发布这个网站

到以下这个网址去抄网方的示例POST代码 https://developers.cloudflare.com/wor... 

抄来的代码最后那段HTML不要, 然后 save and deploy 就可以开作了

只是简单的显示了 The request was a GET

现在我来加入机器人的代码, 只有简单的几行, 非常容易!

粘贴完这段代码

let bodyString = await readRequestBody(request)

try {

    let body = JSON.parse(bodyString);

    const init = {
        headers: { 'content-type': 'application/json' },
    }

    if (body.message) {
        let payload = {
            "method": "sendMessage",
            "chat_id": body.message.chat.id,
            "text": "Only echo back text",
            "parse_mode": "markdown",
            "disable_web_page_preview": true,
        };
        if (body.message.text) {
            payload.text = body.message.text;

            const myInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };

            let myRequest = new Request("https://api.telegram.org/bot682267360...", myInit)

            //let myRequest = new Request("https://eaa874bb.ngrok.io", myInit)
            fetch(myRequest).then(function(x) {
                console.log(x);

            });


            return new Response("OK")
        } else {
            return new Response("OK")
        }

    } else {
        return new Response(JSON.stringify(body), init)
    }

}catch(e){
    return new Response(e)
}

注册刚才高亮的那段代码, 其中的网址是以下这段, 这里面从bot 开始, 就是机器人的token https://api.telegram.org/bot682267360:AAHmjSil8oylavD2pENLLpcMU1svaD7mVeA/setWebhook?url=https://tgbot.ev2.workers.dev/

注意后面那个 / 非常重要, 不能省略

好了, 现在发布改过的代码

发布完成后, 我们需要绑定机器人, 机器人的网址在这里

https://raspy-sun-ed74.fennng.workers... 

为了预防成一, 我们把这个网址做一下 urlencode

网上随便找一个在线的 url encoder , encoder 完是以下的样子

https%3A%2F%2Fraspy-sun-ed74.fennng.workers.dev%2F

现在找到绑定机器人的链接,以下这段是设置机器人的链接, 前面 https://api.telegram.org/bot  这段是固定的,

中间这段 682267360:AAHmjSil8oylavD2pENLLpcMU1svaD7mVeA 是机器人的 token

后面这段是设置机器人链接的方法 /setWebhook?url=

所以我们要把机器人后台链接放在这个链接的最后面

https://api.telegram.org/bot682267360... 

粘贴完后是上面这个样子

现在把这个链接放在浏览器的地址栏打开, 看到以下这个就是绑定成功

{"ok":true,"result":true,"description":"Webhook was set"}

现在我们去试下机器人

工作, 发布成功.

现在来随便改点东西, 简单的加了个签名, 现在再去看看

成功的改了....

很简单吧, 机器人的创建看第一集. 然后, 其它机器人的功能看我关于 谷歌app script 的教程就行了, 差不了多少.

注意的是, cf worker 的 fetch 是 promise, 这点和gas 有很大不同...做简单的机器人可以先不理会. 跟着我的代码写就行了.

好了, 今天的教程就到这里, 喜欢这个视频的话, 不要忘了点赞,订阅还有转发!

谢谢大家. 我们下载再见!