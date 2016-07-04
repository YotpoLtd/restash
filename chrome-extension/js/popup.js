$(document).ready(function() {

    var enabledCheckbox = $('#enabled-checkbox');

    chrome.storage.sync.get('extensionEnabled', function(val) {
        enabledCheckbox.prop('checked', val.extensionEnabled === true);
    });

    enabledCheckbox.change(function() {
        var isChecked = $(this).is(":checked");

        chrome.storage.sync.set({extensionEnabled: isChecked}, function() {
            console.log('extensionEnabled setting saved');
        });
    });
});