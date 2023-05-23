# API Clockmate

## User

POST /login - einloggen des Users
- username: string
- password: string (hash)

GET /user - gibt alle Nutzer zurück

GET /user/profile - Gibt Profil-Informationen über den User


POST /user - legt einen neuen User an
- user: User

PUT /user/<user-id> - updated einen User
- user: User

DELETE /user/<user-id> - löscht einen User

PUT /user/preferences - updated die User Settings
- prefs: Preferences

GET /user/preferences - zeigt die Einstellungen des Nutzers an

## Records

GET /records - Gibt alle Buchungen vom Nutzer zurück

GET /records?<query-params> - gibt Buchungen zur entsprechenden Query zurück
- userId=<user-id>
- customers=[<customer-id>]
- projects=[<project-id>]
- pageSize=<pageSize>
- pageNumber=<page-number>
- sortBy=<sorted-column>
- direction=<sort-direction>
- from=<date-from>
- to=<date-to>

POST /records - fügt eine neue Buchung hinzu
- record: Record

PUT /records/<record-id> - updated eine Buchung
- record: Record

DELETE /records/<record-id> - löscht eine Buchung

## Customer

GET /customers - gibt alle Kunden zurück

GET /customers/<customer-id> - gibt Daten zu einem einzelnen Kunden zurück

GET /customers/<customer-id>/records - gibt alle Records zu diesem Kunden aller Nutzer zurück

GET /customers/<customer-id>/user - gibt alle Nutzer zu diesem Kunden zurück

POST /customers - legt eine neuen Kunden an
- customer: Customer

PUT /customers/<customer-id> - updated ein betehenden Kunden
- customer: Customer

DELETE /customers/<customer-id> - löscht einen Kunden

## Projects

GET /projects - gibt alle Projekte zurück

GET /projects/<project-id> - gibt Daten zu einem einzelnen Projekt zurück

GET /projects/<project-id>/records - gibt alle Records zu diesem Projekt aller Nutzer zurück

GET /projects/<project-id>/user - gibt alle Nutzer zu diesem Projekt zurück

POST /projects - legt ein neues Projekt an
- project: Project

PUT /projects/<project-id> - updated ein betehendes Projekt
- project: Project

DELETE /projects/<project-id> - löscht ein Projekt

## Templates

GET /templates - Gibt die vom Nutzer angelegten / verfügbaren Templates zurück

POST /templates - erstellt ein neues Template
template: Template

PUT /templates/<template-id> - ändert ein bestehendes Template
- template: Template

DELETE /templates/<template-id> - löscht ein Template

## Report

GET /report?<query> - gibt einen Report zur entsprechenden Query
- projects=[<project-id>]
- customers=[<customer-id>]
- userId=<user-id>
- from=<date-from>
- to=<date-to>

