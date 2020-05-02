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
  let url=new URL(request.url)
  let durl=url.searchParams.get('durl')

  if (durl) {
    return fetch(decodeURI(durl))
  }

  const init = {
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  }

  let data = `
    无下载链接，请添加 GET 参数 durl： 
      xxxxx.xxxx.workers.dev/?durl=要下载的文件直链

    without downloadurl, please make sure there is a "durl" GET parameter: 
      xxxxx.xxxx.workers.dev/?durl=downloadurl

    Tip: 如果下载链接比较复杂，建议先 encodeURI

    反馈 issue： https://github.com/hitop/CFWorkers
  `

  return new Response(data, init)
}