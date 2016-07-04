(function() {
  $(document).ready(function() {
    setupEnabledCheckbox();
    setupResqueHost();
  });

  function setupEnabledCheckbox() {
    var enabledCheckbox = $('#enabled-checkbox');

    chrome.storage.sync.get('extensionEnabled', function(val) {
      enabledCheckbox.prop('checked', val.extensionEnabled === true);
    });

    enabledCheckbox.change(function() {
      var isChecked = $(this).is(":checked");

      chrome.storage.sync.set({ extensionEnabled: isChecked }, function() {
        console.log('extensionEnabled setting saved');
      });
    });
  }

  function setupResqueHost() {
    var resqueHost = $('#resque-url');

    chrome.storage.sync.get('resqueUrl', function(val) {
      resqueHost.val(val.resqueUrl);
    });

    resqueHost.change(function() {
      var resqueUrl = $(this).val();

      chrome.storage.sync.set({ resqueUrl: resqueUrl }, function() {
        console.log('resqueUrl setting saved');
      });
    });
  }
})();
