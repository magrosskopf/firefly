# Firefly Documentation

## Vorraussetzungen
1. Ionic installieren: `npm install -g @ionic/cli`
1. Angular für Ionic installieren: `npm install @ionic/angular@latest --save`
2. Neuste Node.js Version installieren: [nodejs.org](https://nodejs.org/en/download/) - Aktuelle installierte Version herausfinden: `node --version`
3. xCode installieren: https://apps.apple.com/us/app/xcode/id497799835?mt=12



## Run on Development
1. Im Terminal ins Verzeichnis `firefly` navigieren.
1. `npm install`im Terminal ausführen.
1. `ionic serve`im Terminal ausführen.
1. Danach sollte sich der Standardbrowser öffnen und die Adresse `localhost:8100` öffnen. Damit gewährleistet ist, dass alle Features der App funktionieren, sollte der [Chrome-Browser](https://www.google.com/intl/de/chrome/) verwendet werde.

## Run on IOS
1. Im Terminal ins Verzeichnis `firefly` navigieren.
1. `npm install` im Terminal ausführen.
1. Cordova einrichten: `npm install -g ios-sim` und `npm install -g ios-deploy`
1. Danach `ionic cordova perpare ios` und `ionic cordova build ios` ausführen. Eventuell muss vorher noch die Plattform IOS mit `ionic cordova add 
1. In xCode wechseln, dann zu **Datei > Öffnen** und das Verzeichnis `unverpacktewahrheit/platforms/ios` öfnnen.
1. Dann zu **xCode > Einstellung** wechseln und im neu geöffneten Fenster zu Accounts navigieren. Dort muss ein neuer Developer Account hinterlegt werden.
1. In der Projektnavigation unter **Signing & Capabilities** kann dann der hinterlegte Account ausgewählt werden. Bei **Bundle Identifier** muss ein einzigartiger Name verwendet werden.
1. Wenn alle Schritte erflogreich abgeschlossen sind, kann entweder ein iPhone angeschlossen werden oder ein Simulator oben in der Leiste ausgewählt werden. Anschließend auf den **Play Button** klicken.
1. Danach sollte sich der Simulator öffnen bzw. die App auf dem angeschlossenen iPhone geöffnet werden. Eventuell muss am eigenen iPhone noch unter **Einstellungen > Allgemein > Geräteverwaltung** die App zugelassen werden.





