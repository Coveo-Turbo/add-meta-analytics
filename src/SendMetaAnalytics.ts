import { Component, IComponentBindings, ComponentOptions, AnalyticsEvents, IChangeAnalyticsCustomDataEventArgs, $$, Utils } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface ISendMetaAnalyticsOptions {
  name?: any;
 }

@lazyComponent
export class SendMetaAnalytics extends Component {
  static ID = 'SendMetaAnalytics';
  static options: ISendMetaAnalyticsOptions = {
    name: ComponentOptions.buildStringOption({ defaultValue: 'Workplace' }),
  };

  constructor(public element: HTMLElement, public options: ISendMetaAnalyticsOptions, public bindings: IComponentBindings) {
    super(element, SendMetaAnalytics.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(element, SendMetaAnalytics, options);
    this.bindEvents();
  }

  private bindEvents() {
    this.bind.onRootElement(AnalyticsEvents.changeAnalyticsCustomData, (arg: IChangeAnalyticsCustomDataEventArgs) => this.handleModifyAnalytics(arg));
  }

  private handleModifyAnalytics(args: IChangeAnalyticsCustomDataEventArgs) {
    //Override with ClickEvent only
    if (args.type === 'ClickEvent') {
      let items = $$(this.element.parentElement).findAll('.CoveoAddMetaAnalytics');
      //@ts-ignore
      var result = args.resultData.raw;
      //@ts-ignore
      result['title'] = args.resultData.title;
      const arg = {};
      for (var i = 0; i < items.length; i++) {
        let checkField = items[i].getAttribute('data-check-field');
        let resultField = items[i].getAttribute('data-result-field');
        let resultFieldUri = items[i].getAttribute('data-result-field-uri');
        let useParent = items[i].getAttribute('data-use-parent') == 'true';
        let analyticsField = items[i].getAttribute('data-analytics-field');
        //Only sent if the resultField is there, and checkField
        var check = '';
        var content = '';
        var contentUri = '';

        if (checkField != null) {
          if (checkField in result) {
            check = result[checkField];
          }
        } else check = 'V';
        if (resultField in result) {
          content = result[resultField];
        }
        if (resultFieldUri in result) {
          contentUri = result[resultFieldUri];
        }
        if (content != '' && check != '') {

          //What we want is the parents field
          //One before the last one which contains the title as the name
          // THIS ONE <parent name="agreements" uri="https://app.box.com/folder/48616971237" />
          //   because the next one contains the title == name
          // <parent name="2013 tier agreement and form revised 10-3-12.pdf" uri="https://app.box.com/file/287602267166" />
          // Case of sharepoint: spsitename, spsiteuri
          if (useParent == true) {
            var parentsXml = result.parents;
            if (parentsXml) {
              var xmlDoc = Utils.parseXml(parentsXml);
              var parents = xmlDoc.getElementsByTagName('parent');
              var tokens = [];
              var separators = [];
              for (var i2 = 0; i2 < parents.length; i2++) {
                var parent_1 = parents.item(i2);
                if (parent_1.getAttribute('name').toLowerCase().indexOf(result.title.toLowerCase()) != -1) {
                  break;
                }
                content = parent_1.getAttribute('name');
                contentUri = parent_1.getAttribute('uri');
              }
            }
          } else {

          }
          arg[analyticsField] = content;
          if (contentUri != '') {
            arg[analyticsField + 'Uri'] = contentUri;
          }
        }
      }
      this.usageAnalytics.logCustomEvent({ name: 'SendMetaAnalytics', type: this.options.name }, arg, this.root);
    }
  }
}