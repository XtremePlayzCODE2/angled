import {AngledComponent} from "angled/core";
import {AngledDecorate, AngledTransform} from "angled/app/utils";

const AngledApplication = AngledDecorate([
  AngledComponent({
    selector: 'angled-application',
    template: '<h1>Hello, Angled!</h1>'
  })
]);
const AngledHTMLApp = AngledTransform(AngledApplication);

export AngledHTMLApp = AngledHTMLApp;
export AngledApplication = AngledApplication;
