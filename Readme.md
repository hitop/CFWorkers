## 一些适用于 cloudflare workers 的小脚本

[关于 cloudflare workers](https://workers.cloudflare.com/docs)

## 使用方法

直接复制 JS 文件内容到 Cloudflare Worker script

## 目前制作

### CDN 加速下载 - download.js

使用 cloudflare 的全球 CDN 加速下载文件。
下载链接通过 Get 关键字 **durl** 传递： xxxxx.xxx.workers.dev/?durl=下载链接

demo: https://dl.ev2.workers.dev/

### 单个网站 CDN 加速 - cdnhost.js

注意替换 *url.hostname="raw.githubusercontent.com"* 这一行的内容，hostname 改为需要 CDN 加速的域名。

保存后，会得到一个链接 - https://xxxx.xxx.workers.dev/ ,可以用这个链接访问原 hostname 网站的内容，自动启用 cloudflare 的 CDN 加速。

### 斗鱼免登录订阅 - dysub.js

demo: https://dy.ev2.workers.dev/

预览效果：

![斗鱼免登录订阅](https://i.loli.net/2020/04/28/fwALy8F5W7kHpuU.jpg)

### 直接输出 Get 内容 - getShow.js

Get 关键字为 **bstr**, 示例 https://xxxx.xxx.workers.dev/?bstr=tmpclipboard

当要传递的内容比较复杂时，建议先 urlencode 或 base64 加密