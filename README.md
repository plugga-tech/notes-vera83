//BACKEND

För att köra notes backend + databas:

- Starta mysql server på port 3306

- I backend behövs fil .env med dessa uppgifter:
  DATABASE_URL="mysql://notes-app:mypassword@localhost:3306/notes"

- I databasen behöver det finnas en användare `notes-app:mypassword`

```
CREATE USER 'notes-app'@'%' IDENTIFIED BY 'mypassword';
```

- Med rättigheter:

```
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, REFERENCES, ALTER ON *.* TO 'notes-app'@'%';
```

- I backend i terminalen kör:

```
npm install
```

- Skapa databastabeller och testdata:

```
npx prisma migrate dev
```

- Starta servern:

```
npm run dev
```

- verifiera genom http://localhost:3000/api/notes/

//FRONTEND

- I frontend i terminalen kör:

```
npm install
```

```
npm run dev
```

Logga in på login startsidan med användare Kalle eller Anna

Du är förhoppningsvis igång!
