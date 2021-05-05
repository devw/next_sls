
export function crisp() {
  const id = process.env.CRISP_WEBSITE_ID
  if (!id) return

  window.$crisp = []
  window.CRISP_WEBSITE_ID = id

  let d = document
  let s = d.createElement('script')

  s.src = 'https://client.crisp.chat/l.js'
  s.async = true

  d.getElementsByTagName('head')[0].appendChild(s)
}

export function hotjar() {
  const id = process.env.HOTJAR_ID
  if (!id) return

  var d = document
  var s = d.createElement('script')

  s.innerHTML = `
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:${id},hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `

  d.getElementsByTagName("head")[0].appendChild(s)
}

export function facebookPixel() {
  const id = process.env.FACEBOOK_PIXEL_ID
  if (!id) return

  let d = document
  let s = d.createElement('script')
  let ns = d.createElement('noscript')

  s.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${id}');
    fbq('track', 'PageView');
  `

  ns.innerHTML = `
    <img
      height="1"
      width="1"
      style="display:none"
      src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"
    />
  `

  d.getElementsByTagName('head')[0].appendChild(s)
  d.getElementsByTagName('head')[0].appendChild(ns)
}

export function googleAnalytics() {
  const id = process.env.GOOGLE_ANALYTICS_ID
  if (!id) return

  let d = document
  let s = d.createElement('script')
  let s2 = d.createElement('script')

  s.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${id}');
  `

  s2.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  s2.async = true

  d.getElementsByTagName('head')[0].appendChild(s)
  d.getElementsByTagName('head')[0].appendChild(s2)
}

export function launchServices() {
  crisp()
  hotjar()
  facebookPixel()
  googleAnalytics()
}