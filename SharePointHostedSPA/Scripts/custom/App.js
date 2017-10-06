$(document).ready(function () {
  var getParameterByName = function (name) {
    var match = RegExp('[?&]' + name + '=([^&]*)', 'i').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  // get the HostWeb URL, title & logo image
  var hostWebUrl = decodeURIComponent(getParameterByName("SPHostUrl"));
  var hostWebTitle = decodeURIComponent(getParameterByName("SPHostTitle"));
  var hostWebLogoUrl = decodeURIComponent(getParameterByName("SPHostLogoUrl"));

  console.log(hostWebUrl, hostWebTitle, hostWebLogoUrl);

  // create chrome control settings
  var options = {
    siteUrl: hostWebUrl,
    siteTitle: hostWebTitle,
    appIconUrl: hostWebLogoUrl,
    appTitle: "SPA Sample",
    settingsLinks: [
      {
        linkUrl: "../_layouts/mcontent.aspx",
        displayName: "Lists Administration"
      }
    ]
  };

  // create the chrome control
  var nav = new SP.UI.Controls.Navigation("chrome_ctrl_container", options);

  // show chrome control
  nav.setVisible(true);

  // hide top app chrome (image & app name)
  nav.setBottomHeaderVisible(false);
});