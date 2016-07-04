var kibanaBody = $('#kibana-body');
chrome.storage.sync.get('extensionEnabled', function(val) {
  if (kibanaBody && val.extensionEnabled === true) {

    var resqueStatusHtml = '<div class="resque-status"></div>';
    var retryHtml = '<div class="btn btn-primary">Retry job</div></div>';
    var jobRetriedHtml = '<div class="btn btn-success">Retry job <span class="glyphicon glyphicon-ok"></span></div></div>';
    var jobFailedHtml = '<div class="btn btn-danger">Retry job <span class="glyphicon glyphicon-remove"></span></div></div>';

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
              } catch (ex) {

              }
            });

            if (failedJob && !$(discover_table_row.find('td.discover-table-timefield div.resque-status')).length) {
              $(discover_table_row.find('td.discover-table-timefield')).append(resqueStatusHtml);
              var resqueStatus = $(discover_table_row.find('td.discover-table-timefield div.resque-status'));
              resqueStatus.html(retryHtml);
              resqueStatus.click(function() {
                chrome.storage.sync.get('resqueUrl', function(storage) {
                  var jqxhr = $.post(storage.resqueUrl + '/restash/retry', JSON.stringify({
                    queue: failedJob.queue,
                    payload: failedJob.payload
                  }), function(response) {
                    console.log(response);
                    if (response.success) {
                      resqueStatus.html(jobRetriedHtml);
                    } else {
                      resqueStatus.html(jobFailedHtml);
                    }
                  }, 'json');
                  jqxhr.fail(function(response) {
                    console.log(response);
                    resqueStatus.html(jobFailedHtml);
                  })
                });
              });
              console.log('created button for ' + JSON.stringify(failedJob));
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
});

