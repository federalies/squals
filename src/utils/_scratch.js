/* global fetch */
/* eslint semi: "error" */

;(async (_console, _fetch, _import, _window) => {
  const log = _console.log;

  const flatten = data => {
    var result = {};
    function recurse (cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop + '[' + i + ']');
        if (l === 0) result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + '.' + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
    recurse(data, '', {});
    return result;
  };

  const pluckHeaders = rowData => {
    return Object.keys(rowData);
  };

  const csv = dataArray => {
    const headers = pluckHeaders(flatten(dataArray[0]));
    const _data = dataArray.map(d => Object.values(flatten(d)));
    const tableData = [headers, ..._data];
    log({ headers, _data, tableData });
    return tableData.reduce((acc, c) => `${acc}\n${c.join(' , ')}`, '');
  };

  var Algolia = await import(`https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js`);
  log({ Algolia });

  var AppID = 'UJ5WYC0L7X';
  var apiKey = '8ece23f8eb07cd25d40262a1764599b1';
  var IdxName = 'Item_production_ordered';
  let hits = [];

  var client = _window.algoliasearch(AppID, apiKey);
  const rights = await client.getApiKey(apiKey);
  log({ rights });

  var index = client.initIndex(IdxName);
  var browser = () => index.browseAll();

  index
    .search({ query: 'iphone' })
    .then(({ hits } = {}) => {
      console.log(csv(hits));
      _window.alert(`I HAVE ALL The Data!!!! MUHWAHHAHAH!!!`);
      _window.alert(`${csv(hits)}`);
    })
    .catch(err => {
      console.log(err);
      console.log(err.debugData);
    });

  browser.on('result', content => {
    hits = hits.concat(content.hits);
  });

  browser.on('error', err => {
    browser.stop();
    throw err;
  });

  browser.on('end', () => {
    log('Finished!');
    log('We got %d hits', hits.length);
    conclude(hits);
  });

  log({ index, browser });

  const conclude = async hits => {
    var airlockReqs = hits.map(resultElem =>
      _fetch(`https://airlock.wework.com/api/v1/users${resultElem.uuid}`)
    );
    var airLockData = await Promise.all(airlockReqs);
    var merged = hits.map((hitElem, i) => ({ ...hitElem, airlock: airLockData[i] }));
    log(JSON.stringify(merged));
    _window.alert(JSON.stringify(merged));
  };
  _window.alert('starting...');
})(console, fetch, s => s, window);
