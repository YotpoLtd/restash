var kibanaBody = $('#kibana-body');
if (kibanaBody) {

  var button = '<div><button type="button" class="btn btn-success retry-button">Retry job</button></div>';

  // doesn't work with jQuery element
  var target = document.getElementById('kibana-body');

  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var rows = $('tr.discover-table-row');
      if (rows && rows.length) {
        rows.each(function(id, elem) {
          var failedJob = undefined;
          var discover_table_row = $(elem);
          discover_table_row.find('dl dd').each(function(id, elem) {
            try {
              var json = JSON.parse($(elem).text())['@fields'];
              if (json.exception && json.failure_line && json.worker && json.queue && json.payload) {
                // Looks like a failed resque job
                failedJob = json;
              }
            } catch(ex) {

            }
          });

          if (failedJob && !$(discover_table_row.find('td.discover-table-timefield button.retry-button')).length) {
            $(discover_table_row.find('td.discover-table-timefield')).append(button);
          }
        })
      }
    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  // later, you can stop observing
  //observer.disconnect();
}