# Viktoriin

Viktoriini veebirakendus on loodud kasutades React raamistikku.  
Küsimused laetakse `src/data/quizQuestions.json` failist. Vaikimisi on kokku viis küsimust, neist igal neli vastusevarianti, kuid praeguse kujunduse juures on võimalik kuvada ka kuni üheksa küsimust.  
Peale vastuse valimist peab kasutaja vastuse kinnitama ning peale seda kuvatakse, kas vastus oli õige või vale. Navigatsiooniriba kaudu on võimalik liikuda tagasi eelmiste küsimuste juurde, kuid juba kinnitatud vastust enam muuta ei saa.  
Viktoriini lõpus kuvatakse punktitulemus, vastavalt skoorile sõnum ning iga küsimuse kohta tulemus, õige vastus ja valesti vastamise puhul ka kasutaja poolt antud vastus.

## Autor

Erik Hans Sepp

## Veebileht

Rakendus on üleval veebilehel [https://eriksepp.github.io/](https://eriksepp.github.io/)

## Testimine lokaalselt

Kui soovid projekti oma arvutis testida, peab olema installeeritud Node.js.  
Peale kausta arvutisse kloonimist tuleb projekti kaustas olles Node.js moodulite installatsiooniks sisestada käsureale käsklus `npm install`.

Kui kõik vajalikud moodulid on installeeritud saad käivitada järgmised skriptid:

### `npm start`

Käivitab rakenduse arendusrežiimis.\
Ava [http://localhost:3000](http://localhost:3000), et seda oma brauseris vaadata.

### `npm run build`

Ehitab rakenduse avaldamiseks `build` kausta.
