import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { MyCustomObserver } from './mycustomobserver';

@Component({
	selector: 'app-root',
	// templateUrl: './app.component.html',
	template: `<h1>Hello</h1><button (click)="createObservable()">créer un observable</button>`
	// styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app';

// Création observable à partir de la méthode statique .from()
    // .from() est un opérateur de création d'observable
    createObservable() {
    	let numbers = [1, 2, 3];

    	// Convention: variable$ = observable (facilement identifiable)
    	// Observable contient tableau en données
    	let numbers$ = Observable.from(numbers);

    	// On s'abonne à l'observable en lui fournissant un custom observer en paramètre
    	// en l'initialisant via constructeur new
    	// numbers$.subscribe(new MyCustomObserver());

		// Sinon on utilise Rxjs en passant directement les 3 méthodes en paramètres
    	numbers$.subscribe(
    		val => console.log(`valeur: ${val}`),
    		err => console.error(`error: ${err}`),
    		() => console.log('complete')
    	);

    	// Penser à s'abonner, sinon aucune données poussées
    }

// Création observable à partir de la méthode statique Observable.create()
    // Fonction qui prends en paramètre un observer
    createObservable() {
    	let numbers = [3, 4, 100, 5];

    	let numbers$ = Observable.create((observer: any) => {
    		for( let n of numbers ) {
    			if ( n > 10 )
    			{
    				observer.error('trop grand');
    				// Si observer s'arrête sur une erreur, il ne passe jamais à l'état complete
    			}
    			
    			observer.next(n);
    		}
    		observer.complete();
    	});

    	numbers$.subscribe(
    		val => console.log(val),
    		err => console.error(err),
    		() => console.log('complete')
    	)
    }
}

// 1 opérateur est une fonction a appeler sur un observable qui retourne un nouvel observable
// 1 opérateur ne modifie pas l'observable source (comme map() en Javascript par ex)
