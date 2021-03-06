import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-fixed-header-table',
    templateUrl: './fixed-header-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFixedHeaderTableNg1Component')
export class ComponentsFixedHeaderTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;

    codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'FixedHeaderCtrl'
        },
        js: [this.snippets.raw.codepenJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}