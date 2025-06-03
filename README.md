# Moment 4 i kursen DT207G, Backend-baserad webbutveckling

## Uppgift 1
Detta är ett API som är byggt med Express samt MongoDB för att registrera ett användarkonto och logga in till det.

### Installation
Detta API använder en MongoDB-databas. Installera nödiga npm paket såsom (express, mongoose, nodemon, bcrypt, body-parser, dotenv, router, jsonwebtoken). Databas är skapad i MongoDB Atlas, och har skapat model för användare med definierat schema enligt följande:
| Fält | Datatyp | Beskrivning |
|------|---------|-------------|
| _id | ObjectId | Unikt ID, genereras automatiskt i MongoDB|
| username | String | Användarnamn|
| email | String | E-post|
| password | String | Lösenord|
| created | Date | Registreringsdatum|

### Användning
Nedan finns hur man använder APIet på olika sätt:
| Metod | Ändpunkt | Beskrivning |
|-------| ---------|-------------|
| POST | /register | Skapa användarkonto |
| POST | /login | Logga in till konto |
| GET | /protected | Komma in till skyddad route |
### Tommy Issa, tois2401