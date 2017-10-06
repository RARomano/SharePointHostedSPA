import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class AppComponent extends Vue {
  getParameterByName(name: string) : string {
    var match = RegExp('[?&]' + name + '=([^&]*)', 'i').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  created() {
    // get the HostWeb URL, title & logo image
    var hostWebUrl = decodeURIComponent(this.getParameterByName("SPHostUrl"));
    var hostWebTitle = decodeURIComponent(this.getParameterByName("SPHostTitle"));
    var hostWebLogoUrl = decodeURIComponent(this.getParameterByName("SPHostLogoUrl"));

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
  }
}
