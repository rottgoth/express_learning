document.addEventListener('DOMContentLoaded', DocumentReady, false);

function DocumentReady() {
  // Handling form submit
  var form = document.querySelector('form');

  form.onsubmit = function(event) {
    event.preventDefault();
    var queryString = serializeForm(form);
    // console.log('submitting', queryString);
    post('blocks', queryString, postNewBlockCallback);
  };

  // Handling Ajax calls via plain JavaScript source: http://code.tutsplus.com/articles/how-to-make-ajax-requests-with-raw-javascript--net-4855

  var postNewBlockCallback = function(xhr) {
    var data = JSON.parse(xhr.responseText);
    // console.log(xhr, data);
    appendToList([data]);
    form.reset();
  }

  var getBlocksCallback = function(xhr) {
    var data = JSON.parse(xhr.responseText);
    // console.log(xhr, data);
    appendToList(data);
  };

  var appendToList = function(data) {
    var blockList = document.createDocumentFragment();
    data.forEach(function(block) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.innerHTML = block;
      link.href = "/blocks/" + block;
      li.appendChild(link);
      blockList.appendChild(li);
    });
    document.querySelector('.block-list').appendChild(blockList);    
  }

  get('blocks?limit=2', getBlocksCallback);

  function serializeForm(form) {
    var enabledElements = [].filter.call(form.elements, function (node) { return !node.disabled && node.name && node.value !== undefined; });
    return [].map.call(enabledElements, function(node) {
      return encodeURIComponent(node.name) + "=" + encodeURIComponent(node.value);
      // option b
      // return [node.name, node.description].map(encodeURIComponent).join('=');
    }).join('&');
  }

  function post(url, data, callback) {
    var request = new Request(callback);
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(data);
  }

  function get(url, callback) {
    var request = new Request(callback);
    request.open('GET', url, true);
    request.send('');
  }

  function Request(success, error) {
    var xhr = new XMLHttpRequest();
    var successCallback = success;
    var errorCallback = error;

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
      // all is well  
      if(xhr.readyState === 4) {
        switch(true) {
          case (xhr.status >= 200 && xhr.status < 400):
            successCallback(xhr);
            break;
          case (xhr.status > 400):
            errorCallback(xhr);
            break;
          default:
            console.log('Http Error', xhr);
        }
      }
    }

    return xhr;
  }
}