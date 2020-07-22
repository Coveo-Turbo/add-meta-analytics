import { Component, IComponentBindings, ComponentOptions,IBuildingQueryEventArgs,QueryEvents } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IAddMetaAnalyticsOptions {
  checkField?: any;
  resultField?: any;
  resultFieldUri?: any;
  useParent?: any;
  analyticsField?: any;
  name?: any;
}

@lazyComponent
export class AddMetaAnalytics extends Component {
    static ID = 'AddMetaAnalytics';
    static options: IAddMetaAnalyticsOptions = {
      checkField: ComponentOptions.buildStringOption({ defaultValue: '' }),
      resultField: ComponentOptions.buildStringOption(),
      resultFieldUri: ComponentOptions.buildStringOption({ defaultValue: '' }),
      analyticsField: ComponentOptions.buildStringOption({ defaultValue: '' }),
      useParent: ComponentOptions.buildBooleanOption({ defaultValue: false }),
      name: ComponentOptions.buildStringOption(),
    };

    constructor(public element: HTMLElement, public options: IAddMetaAnalyticsOptions, public bindings: IComponentBindings) {
        super(element, AddMetaAnalytics.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, AddMetaAnalytics, options);
        this.bindEvents();
    }
    private bindEvents() {
      //this.bind.onRootElement(AnalyticsEvents.changeAnalyticsCustomData, (arg: IChangeAnalyticsCustomDataEventArgs) => this.handleModifyAnalytics(arg));
      this.bind.onRootElement(QueryEvents.buildingQuery, (arg: IBuildingQueryEventArgs) => this.handleQuery(arg));
    }
  
    private handleQuery(args: IBuildingQueryEventArgs) {
      var fields=[];
      if (this.options.checkField!="") fields.push(this.options.checkField);
      if (this.options.resultField!="") fields.push(this.options.resultField);
      if (this.options.resultFieldUri!="") fields.push(this.options.resultFieldUri);
      if (fields.length>0){
        args.queryBuilder.addFieldsToInclude(fields);
      }
    }
}