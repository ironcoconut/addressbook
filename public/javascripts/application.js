dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");

/* 
 * Code to disable/enable the second contact for an address 
 */
function adjustSelectableContacts() {
  var INDIVIDUAL = 1;
  var SINGLE_PARENT = 5;
  var addressContact2 = document.getElementById("addressContact2");
  var addressTypeElement = document.getElementById("addressType");

  if (addressTypeElement.value != INDIVIDUAL &&
      addressTypeElement.value != SINGLE_PARENT) {
    addressContact2.style.visibility = "visible";
  } else {
    addressContact2.style.visibility = "hidden";
  }
}

/*
 * Updates the create labels link to specify the proper label type
 */
function updateCreateLabelsLink(url) {
  var selector = document.getElementById('labelTypeSelector');
  var newLinkHtml = '<a href="' + url + '?label_type=' + selector.value + 
    '" onclick="window.open(this.href,\'label_window\',\'label_window\');return false;"' + 
    '>Create Labels</a>';
  Element.update('createLabelsLink', newLinkHtml);
}

/*
 * Functions used while maintaining group members
 */
function includeSelectedMembers() {
  $('not_included').childElements().each(function(s) {
    if (s.selected == true) {
      $('included').insert({'bottom': s});
    }
  });
}

function excludeSelectedMembers() {
  $('included').childElements().each(function(s) {
    if (s.selected == true) {
      $('not_included').insert({'bottom': s});
    }
  });
}

function includeAllMembers() {
  $('not_included').childElements().each(function(s) {
    $('included').insert({'bottom': s});
  });
}

function excludeAllMembers() {
  $('included').childElements().each(function(s) {
    $('not_included').insert({'bottom': s});
  });
}

function selectAllIncludedGroupMembers() {
  $('included').childElements().each(function(s) {
    s.selected = true;
  });
}

function selectExistingAddressOption() {
  $('existing_address').checked = true;
}

function selectSpecifiedAddressOption() {
  $('specified_address').checked = true;
}

function editAddress() {
  $('specifyAddress').show();
  $('address').hide();
}

function changeAddressForAll() {
  $("submit_id").value = "yes";
  closeFancybox();
}

function changeAddressForSpecified() {
  $("submit_id").value = "no";
  closeFancybox();
}

function closeFancybox() {
  jQuery.fancybox.close();
}

function displayMaintainGroupMembers() {
  Element.hide('displayGroupMembers');
  Element.show('editGroupMembers');
}
