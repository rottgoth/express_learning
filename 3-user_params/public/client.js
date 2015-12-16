// Handling Ajax calls via plain JavaScript source: http://code.tutsplus.com/articles/how-to-make-ajax-requests-with-raw-javascript--net-4855

load('blocks?limit=2', function(xhr) {
  var data = JSON.parse(xhr.responseText);
  console.log(xhr, data);
  var blockList = document.createDocumentFragment();
  data.forEach(function(block) {
    var li = document.createElement('li');
    li.innerHTML = block;
    blockList.appendChild(li);
  });
  document.querySelector('.block-list').appendChild(blockList);
});
 
function load(url, callback) {
  var xhr = new XMLHttpRequest();

  // ie check
  if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
  else {
    var versions = ["MSXML2.XmlHttp.5.0", 
                    "MSXML2.XmlHttp.4.0",
                    "MSXML2.XmlHttp.3.0", 
                    "MSXML2.XmlHttp.2.0",
                    "Microsoft.XmlHttp"];

    for(var i = 0, len = versions.length; i < len; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      }
      catch(e){}
    } // end for
  }

  xhr.onreadystatechange = ensureReadiness;
   
  function ensureReadiness() {
    // onreadystatechange will fire five times as your specified page is requested.
    // 0: uninitialized
    // 1: loading
    // 2: loaded
    // 3: interactive
    // 4: complete
    // console.log(xhr.readyState);
    if(xhr.readyState < 4) {
      return;
    }
     
    if(xhr.status !== 200) {
      return;
    }

    // all is well  
    if(xhr.readyState === 4) {
      callback(xhr);
    }
  }
   
  xhr.open('GET', url, true);
  xhr.send('');
}