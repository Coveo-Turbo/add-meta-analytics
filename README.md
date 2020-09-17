# add-meta-analytics

Add additional Analytics metadata based upon metadata from the current result.
For example: you want to sent the Author or Accountname to a custom analytics event for use in a ML model.

** Make sure that all the `analyticsFields` defined are created as `Dimensions` in your Coveo Cloud Organization. **


There are two components:
## CoveoAddMetaAnalytics
To define the metadata and fields which you want to sent.
## CoveoSendMetaAnalytics
This component will gather all the `AddMetaAnalytics` definitions and will send them to the Analytics.

** So without `CoveoSendMetaAnalytics` nothing will happen!!! **

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/add-meta-analytics
```

2. Use the Component or extend it

Typescript:

```javascript
import { AddMetaAnalytics, IAddMetaAnalyticsOptions } from '@coveops/add-meta-analytics';
import { SendMetaAnalytics, ISendMetaAnalyticsOptions } from '@coveops/add-meta-analytics';
```

Javascript

```javascript
const add-meta-analytics = require('@coveops/add-meta-analytics').AddMetaAnalytics;
const send-meta-analytics = require('@coveops/add-meta-analytics').SendMetaAnalytics;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/add-meta-analytics'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/add-meta-analytics@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component after your `CoveoSearchInterface`

```html
<div
    class="CoveoAddMetaAnalytics"
    data-result-field="jifieldsprojectname"
    data-result-field-uri=""
    data-analytics-field="c_wpprojectname"
  ></div>
<div
    class="CoveoAddMetaAnalytics"
    data-result-field="displayname"
    data-check-field="worktitle"
    data-use-parent="false"
    data-analytics-field="c_wpauthordisplay"
  ></div>
<div class="CoveoSendMetaAnalytics"></div>
```


## Options

### CoveoAddMetaAnalytics
The following options can be configured:

| Option | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `checkField` | No | string | ` ` | This field must exists on the result, if it does not, nothing will be send. Use this when you want to sent a resultField with a condition. |
| `resultField` | Yes | string | ` ` | Which field to use from the result, if the field is empty it will not be send |
| `resultFieldUri` | No | string | ` ` | Which field to use from the result for a possible URI. If this one is present the analyticsfield will get Uri added. (Like c_wpauthordisplayUri) |
| `useParent` | No | boolean | `false` | Whether to use the `parents` to find the folder. |
| `analyticsField` | Yes | string | ` ` | Dimension to use to store the value. Must exists!!! |

### CoveoSendMetaAnalytics
The following options can be configured:

| Option | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | No | string | `Workplace` | Name to use for the Custom Event |


## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`
