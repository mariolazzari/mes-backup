# mes-backup

## Database

### Utenti

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  totp_secret TEXT
);
```

### Registrazioni

| Campo             | Tipo         | Note                                          |
| ----------------- | ------------ | --------------------------------------------- |
| Id                | Number(10)   |                                               |
| ODP               | Char(20)     | Tutto maiuscolo                               |
| Fase              | Char(4)      |                                               |
| Prodotto          | Char(20)     | Tutto Maiuscolo                               |
| UM_PROD           | CHAR(4)      | LISTA UM SELEZIONABIL.                        |
| Qta prodotta      | Number(15,3) |                                               |
| HU_prod_ok        | Char(20)     |                                               |
| Qta Scartata      | Number(15,3) |                                               |
| HU_scarto         | Char(20)     |                                               |
| Data e ora inizio | DateTime     |                                               |
| Date e ora fine   | Datetime     |                                               |
| Componente        | Char(20)     |                                               |
| HU_Comp           | Char(20)     |                                               |
| Flag_HU_Comp      | Char(1)      | Y/N default Se Y significa che la HU è finita |
| Um_CONS           | CHAR(4)      | LISTA UM SELEZIONABIL.                        |
| Qta_cons          | Number(15,3) |
