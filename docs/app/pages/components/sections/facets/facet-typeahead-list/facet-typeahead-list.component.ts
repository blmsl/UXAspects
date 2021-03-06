import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
@DocumentationSectionComponent('ComponentsFacetTypeaheadListComponent')
export class ComponentsFacetTypeaheadListComponent extends BaseDocumentationSection implements IPlunkProvider {

    facets: Observable<Facet[]>;
    suggestions: Facet[] = [];

    users: Facet[] = [];

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        mappings: [
            {
                alias: 'chance',
                source: 'npm:chance@1.0.6'
            }
        ],
        modules: [{
            imports: ['FacetsModule'],
            library: 'ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // generate random facet data
        for (let idx = 0; idx < 1000; idx++) {
            this.users.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100 })));
        }

        // sort the users alphabetically
        this.users.sort((userOne, userTwo) => {
            if (userOne.title < userTwo.title) {
                return -1;
            } 

            if (userOne.title > userTwo.title) {
                return 1;
            }

            return 0;
        });

        // present the top 6 items as suggestions
        this.suggestions = this.users.slice(0, 6);

        // Create an observable which can be used for fetching data from server
        this.facets = Observable.create((observer: Observer<Facet[]>) => {

            // get the search query
            let searchQuery = (<any>observer).destination.outerValue;

            // simulate server request
            setTimeout(_ => {

                // return list of filtered users from "server"
                observer.next(this.users); 
            }, 750);
        });

    }
}