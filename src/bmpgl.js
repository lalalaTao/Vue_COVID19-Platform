// bmpgl.js
export function BMPGL(ak) {
    return new Promise(function(resolve, reject) {
      window.init = function() {
        // eslint-disable-next-line
        resolve(BMapGL)
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`
      script.onerror = reject
      document.head.appendChild(script)


    //   console.log('BMapLib.DrawingManager loading!')
    //   let script3 = document.createElement('script')
    //   script3.type = 'text/javascript'
    //   script3.src = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js'
    //   document.body.appendChild(script3)
    //   let link = document.createElement('link')
    //   link.rel = 'stylesheet'
    //   link.href = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css'
    //   document.body.appendChild(link)


    //   console.log('BMapLib.TrackAnimatio loading!')
    //   let script1 = document.createElement('script')
    //   script1.type = 'text/javascript'
    //   script1.src = '//mapopen.bj.bcebos.com/github/BMapGLLib/TrackAnimation/src/TrackAnimation.min.js'
    //   document.body.appendChild(script1)
    })
  }

