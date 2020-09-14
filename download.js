/* 
** 功能：使用 cloudflare 全球 CDN 加速下载文件
** 使用：
**   - 将代码拷贝到 cloudflare workers Script
**   - xxxxx.xxxx.workers.dev/?durl=要下载的文件直链
***
** 注意：如果下载链接中包含有特殊字符，先 encodeURI
*/

addEventListener(
  "fetch",event => {
    event.respondWith(
      handleRequest(event.request)
    )
  }
)

/**
 * 请求下载文件
 * @param  {web Request} request 网络请求
 * @return {web Response}        请求结果
 */
async function handleRequest(request) {
  let durl = request.url.split('durl=')[1]

  if (durl) {
    return fetch(decodeURI(durl))
  }

  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }

  let data = `
  <link rel="icon" href="https://www.cloudflare.com/favicon.ico">
  <title>Speed Up Download</title>
  <style>
    body {background: #82b64a;background-image: url(https://bing.ioliu.cn/v1/rand);}
    .downwrap, .project {position: fixed;display: inline-flex;width: fit-content;max-width: 100%;left: 0;right: 0;margin: auto;}
    .downurl {height: 42px;width: 600px;border-radius: 22px;outline: none;border: none;padding: 0 16px;font-size: 20px;color: #0047AB;}
    .downwrap {top: 32%;flex-direction: column;justify-content: space-around;text-align: center;align-items: center;}
    .project {bottom: 1em;color: white;}
    .fullurl, .project {text-decoration: none;}
    .fullurl {color: white;word-break: break-all;margin-top: 8px;max-width: 560px;max-height: 200px;overflow: auto;}
  </style>
  <body>
    <div class="downwrap">
      <input class="downurl" placeholder="download link 下载地址 <Enter>">
      <a class="fullurl" href="" target="_blank"></a>
    </div>
    <a class="project" href="https://github.com/hitop/CFWorkers" target="_blank">https://github.com/hitop/CFWorkers</a>
    <script>
      document.addEventListener('keyup', (e) => {
        const url = '/?durl=' + encodeURI(document.querySelector('.downurl').value)
        if (e.key === 'Enter') {
          window.open(url)
        } else {
          document.querySelector('.fullurl').innerText = url
          document.querySelector('.fullurl').href = url
        }
      })
    </script>
  </body>
  `

  return new Response(data, init)
}