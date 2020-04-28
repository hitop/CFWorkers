addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  let { readable, writable } = new TransformStream()

  streamBody(writable)

  return new Response(readable, init)
}

async function streamBody(writable) {
  // returns its response.
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }
  let writer = writable.getWriter()
  let encoder = new TextEncoder()
  let now = (new Date()).toISOString()
  now = now.slice(0,10) + " " + (parseInt(now.slice(11,13)) + 8) + now.slice(13, -5)

  await writer.write(encoder.encode(`
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><link rel='shortcut icon' href='https://www.douyu.com/favicon.ico'><title>斗鱼直播订阅 - elecV2</title>

    <style>body{background: black;color: #CCCCFF;}.live, .nolive {display: flex;flex-flow: wrap;justify-content: space-between;}.center {text-align: center;}.liveroom {display: inline-block;width: 320px;margin: 8px;text-align: center;}name {margin-right: 60px;}img:hover {transform: scale(1.6);}a {color: #CCCCFF; text-decoration: none;width: 100%;display: inline-block;}p {margin: 6px 0;}.now, .nopic {width: 100%}.gcolumn, .nolive {justify-content:center; padding-left: 0;box-sizing: border-box;}.gcolumn li {display: inline-block;width: 220px;border: 1px solid #234;border-radius: 8px;margin: 10px;padding: 8px;box-sizing: border-box;}.noliveitem {display: inline-block;margin: 8px 16px;padding: 8px 20px;border-radius: 8px;border: 1px solid;}</style>

    <h2 class='now center'>${ now }</h2>
    <div class="live">

    </div>
    <div class="nopic center">
      <ul class="gcolumn">
        <li><a href="https://douyu.com/directory/columnRoom/yl" target="_blank">娱乐天地</a></li>
        <li><a href="https://www.douyu.com/g_yqk" target="_blank">一起看</a></li>
        <li><a href="https://www.douyu.com/g_HW" target="_blank">户外</a></li>
        <li><a href="https://github/hitop/CFWorkers" target="_blank">项目 Github</a></li>
      </ul>

      <h3 class="center">还在休息中的主播们</h3>
      <ul class="nolive">
        
      </ul>
    </div>
  `))

  const someHost = 'https://open.douyucdn.cn/api/RoomApi/room/'
  const roomList = [67373, 156277, 2158798, 73570, 9999, 6561105, 2135, 74751, 1209, 109064, 268932, 796449, 5763963, 4632993, 1504507, 2295410, 196, 4930412, 831528, 241123, 1335445, 1819549, 244548, 452628, 562590, 594613, 431972, 229346, 599351, 265438, 5440020, 309923, 2060620, 131977, 6566671, 540434, 3649581, 122402, 81970, 431460, 248753, 7034316, 1611559, 902379, 52787]

  for (var i = 0; i < roomList.length; i++) {
    let rid = roomList[i]
    await fetch(someHost + rid, init).then(res=>res.json()).then(tjson=>{
      if (tjson["error"] == 0 && tjson['data']['room_status'] <= 1) {
        writer.write(encoder.encode("<script>document.querySelector('.live').insertAdjacentHTML('beforeend',\"<div class='liveroom'><a target='_blank' href='https://www.douyu.com/" + tjson.data["room_id"] + "'><img src='"+tjson['data']['room_thumb']+"'><p>"+tjson['data']['room_name']+"</p><name>"+tjson['data']['owner_name']+"</name><hot>"+tjson['data']['online']+"</hot></a></div>\")</script>"))
      } else {
        writer.write(encoder.encode("<script>document.querySelector('.nolive').insertAdjacentHTML('beforeend',\"<li class='noliveitem' title='" + tjson.data["room_id"] + "'>" + tjson['data']['owner_name'] + " - " + tjson['data']['room_name'] + "</li>\")</script>"))
      }
    })
  }

  await writer.close()
}