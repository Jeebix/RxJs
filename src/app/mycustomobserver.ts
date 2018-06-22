// 1 observer peut être considéré comme un objet qui dispose
// des méthodes next, error et complete

export class MyCustomObserver {
	next(val) {
		console.log(`valeur: ${val}`);
	}

	error(err: any) {
		console.error(`error: ${err}`);
	}

	complete() {
		console.log('complete');
	}
}